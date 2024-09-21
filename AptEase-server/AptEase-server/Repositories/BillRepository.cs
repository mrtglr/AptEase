using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AptEase_server.Context;
using AptEase_server.Models;
using System.Threading.Tasks;


namespace AptEase_server.Repositories
{
    public class BillRepository : IBillRepository
    {
        private readonly AptEaseContext _context;
        private UserManager<ApplicationUser> _userManager;
        private readonly INotificationRepository _notificationRepo;

        public BillRepository(AptEaseContext context, UserManager<ApplicationUser> userManager, INotificationRepository notificationRepo)
        {
            _context = context;
            _userManager = userManager;
            _notificationRepo = notificationRepo;
        }

        public IQueryable<Bill> List()
        {
            return _context.Bills
                .Include(x => x.ApplicationUser)
                .OrderByDescending(x => x.CreateDate);
        }

        public Bill GetBill(int bill_id)
        {
            return List().Where(x => x.Id == bill_id).FirstOrDefault();
        }

        public IQueryable<Bill> GetUserBills(string user_id)
        {
            var query = List().Where(x => x.ApplicationUserId == user_id)
                .Include(x => x.ApplicationUser);       
            return query;
        }

        public IQueryable<Bill> GetHandoverUserBills(string user_id)
        {
            var query = List().Where(x => x.ApplicationUserId == user_id && x.isPaid == false)
                .Include(x => x.ApplicationUser);
            return query;
        }

        public async Task AddBillForUsers(Bill new_bill)
        {
            var users = _userManager.Users.Where(x => x.UserRole == false).ToList();
            var newBills = new List<Bill>();

            foreach (var user in users)
            {
                newBills.Add(new Bill
                {
                    BillDescription = new_bill.BillDescription,
                    BillAmount = new_bill.BillAmount,
                    isPaid = false,
                    CreateDate = DateTime.Now,
                    CutOffDate = DateTime.Now,
                    DueDate = new_bill.DueDate,
                    DateOfPaid = null,
                    ApplicationUserId = user.Id
                });

                await _notificationRepo.GenerateNotification(2, user);
            }

            await _context.Bills.AddRangeAsync(newBills);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveBill (int bill_id, string user_id)
        {
            var user = _userManager.FindByIdAsync(user_id).Result;
            if (user.UserRole == true)
            {
                var bill = GetBill(bill_id);
                var bill_transection = _context.Transections.FirstOrDefault(x => x.BillId == bill_id);
                if (bill_transection != null)
                    _context.Remove(bill_transection);
                _context.Remove(bill);
                _context.SaveChanges();
            }
        }

        private async Task<int> UpdateBill (Bill bill)
        {
            _context.Entry(bill).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
            await _context.SaveChangesAsync();
            return bill.Id;
        }

        private async Task UpdateBillsWhole(List<Bill>? bills)
        {
            _context.Bills.UpdateRange(bills);
            await _context.SaveChangesAsync();
        }

        public async Task<int> ApproveBillPaymentAsync(int bill_id)
        {
            var bill = List().Where(x => x.Id == bill_id).FirstOrDefault();
            bill.isPaid = true;
            bill.DateOfPaid= DateTime.Now;
            await UpdateBill(bill);
            return bill.Id;
        }

        public async Task CreateBillsGeneric(BillGenericModel billGenericModel)
        {
            var users = _userManager.Users.Where(x => x.UserRole == false).ToList();
            var newBills = new List<Bill>();
            var overdueBills = new List<Bill>();

            foreach (var user in users)
            {
                var handoverUserBills = GetHandoverUserBills(user.Id);

                if (handoverUserBills.Count() > 0)
                {
                    foreach (var bill in handoverUserBills)
                    {
                        bill.BillAmount += (bill.BillAmount * 15) / 100;
                        overdueBills.Add(bill);                        
                    }
                    await _notificationRepo.GenerateNotification(4, user);
                }

                newBills.Add(new Bill
                {
                    BillDescription = "Due of " + getAbbreviatedName(DateTime.Now.Month),
                    BillAmount = billGenericModel.BillAmount,
                    OriginalBillAmount = billGenericModel.BillAmount,
                    isPaid = false,
                    CreateDate = DateTime.Now,
                    CutOffDate = billGenericModel.CutOffDate,
                    DueDate = billGenericModel.DueDate,
                    DateOfPaid = null,
                    ApplicationUserId = user.Id
                });
                
                await _notificationRepo.GenerateNotification(2, user);
            }

            await UpdateBillsWhole(overdueBills);
            await _context.Bills.AddRangeAsync(newBills);
            await _context.SaveChangesAsync();
        }

        private string getAbbreviatedName(int month)
        {
            DateTime date = new DateTime(2020, month, 1);

            return date.ToString("MMM", new System.Globalization.CultureInfo("en-EN"));
        }

        public async Task<BillPaymentRule> GetBillPaymentRule(string user_id)
        {
            var user = _userManager.FindByIdAsync(user_id).Result;
            if (user.UserRole == true)
                return await _context.BillPaymentRules.Where(x => x.Id != 0).FirstAsync();
            return null;
        }

        public async Task<int> UpdateBillPaymentRule(BillPaymentRule billPaymentRule, string user_id)
        {
            var user = _userManager.FindByIdAsync(user_id).Result;
            if (user.UserRole == true)
            {
                billPaymentRule.Id = 7;
                billPaymentRule.ModifyDate = DateTime.Now;
                _context.Entry(billPaymentRule).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
                _context.SaveChanges();
                await _notificationRepo.GenerateNotification(3, null);
                return billPaymentRule.Id;
            }
            else
                return 0;
        }

        public IQueryable<UserDebtAnalisysModel> getUserDebtAnalisys()
        {
            var result = (from bill in _context.Bills
                          join user in _userManager.Users on bill.ApplicationUserId equals user.Id
                          group bill by user.FullName into groupedBills
                          select new UserDebtAnalisysModel()
                          {
                              Name = groupedBills.Key,
                              Value = groupedBills.Sum(b => b.BillAmount)
                          }).ToList();
            return result.AsQueryable();
        }

        public List<BillAnalisysModel> getBillAnalisys()
        {
            var RetVal = new List<BillAnalisysModel>();

            BillAnalisysModel Dues = new BillAnalisysModel();
            BillAnalisysModel OtherBills = new BillAnalisysModel();
            BillAnalisysModel InterestAmount = new BillAnalisysModel();

            Dues.Name = "Dues";
            OtherBills.Name = "Other Bills";
            InterestAmount.Name = "Interest Amount";

            var unPaidBills = List().Where(x => x.isPaid == false).ToList();

            var dues = unPaidBills.Where(x => x.BillDescription.Contains("Due"));
            var otherBills = unPaidBills.Where(x => !x.BillDescription.Contains("Due"));
            var interestBills = unPaidBills.Where(x => x.BillDescription.Contains("Due") && (x.BillAmount != x.OriginalBillAmount));

            Dues.Value = dues.Sum(x => x.OriginalBillAmount);
            OtherBills.Value = dues.Sum(x => x.BillAmount);
            InterestAmount.Value = dues.Sum(x => (x.BillAmount - x.OriginalBillAmount));

            RetVal.Add(Dues);
            RetVal.Add(OtherBills);
            RetVal.Add(InterestAmount);

            return RetVal;
        }
    }

    public interface IBillRepository
    {
        IQueryable<Bill> List();
        Bill GetBill(int bill_id);
        IQueryable<Bill> GetUserBills(string user_id);
        IQueryable<Bill> GetHandoverUserBills(string user_id);
        Task AddBillForUsers(Bill new_bill);
        Task RemoveBill(int bill_id, string user_id);
        Task<int> ApproveBillPaymentAsync(int bill_id);
        Task CreateBillsGeneric(BillGenericModel billGenericModel);
        Task<BillPaymentRule> GetBillPaymentRule(string user_id);
        Task<int> UpdateBillPaymentRule(BillPaymentRule billPaymentRule, string user_id);
        IQueryable<UserDebtAnalisysModel> getUserDebtAnalisys();
        List<BillAnalisysModel> getBillAnalisys();
    }
}
