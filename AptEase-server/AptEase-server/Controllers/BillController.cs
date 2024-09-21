using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AptEase_server.Models;
using AptEase_server.Repositories;

namespace AptEase_server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BillController : ControllerBase
    {
        private readonly IBillRepository _billRepo;

        public BillController(IBillRepository billRepo)
        {
            _billRepo = billRepo;
        }

        [HttpGet]
        [Route("list")]
        public IQueryable<Bill> List()
        {
            return _billRepo.List();
        }

        [HttpGet]
        [Route("getBill")]
        public Bill GetBill(int bill_id)
        {
            return _billRepo.GetBill(bill_id);
        }

        [HttpGet]
        [Route("getUserBills")]
        public IQueryable<Bill> GetUserBills(string user_id)
        {
            return _billRepo.GetUserBills(user_id);
        }

        [HttpGet]
        [Route("getBillsForUser")]
        public IQueryable<Bill> GetBillsForUser()
        {
            string user_id = User.Claims.First(c => c.Type == "UserID").Value;
            return _billRepo.GetUserBills(user_id);
        }

        [HttpGet]
        [Route("getHandoverUserBills")]
        public IQueryable<Bill> GetHandoverUserBills()
        {
            string user_id = User.Claims.First(c => c.Type == "UserID").Value;
            return _billRepo.GetHandoverUserBills(user_id);
        }

        [HttpPost]
        [Route("addBillForUsers")]
        public async Task AddBillForUsers([FromBody] Bill new_bill)
        {
            await _billRepo.AddBillForUsers(new_bill);
        }

        [HttpDelete]
        [Route("removeBill")]
        public async Task RemoveBillAsync(int bill_id)
        {
            string user_id = User.Claims.First(c => c.Type == "UserID").Value;
            await _billRepo.RemoveBill(bill_id, user_id);
        }

        [HttpPost]
        [Route("approveBillPayment")]
        public async Task<int> ApproveBillPaymentAsync(int bill_id)
        {
            return await _billRepo.ApproveBillPaymentAsync(bill_id);
        }

        [HttpPost]
        [Route("createBillsGeneric")]
        public async Task CreateBillsGeneric([FromBody] BillGenericModel billGenericModel)
        {
            await _billRepo.CreateBillsGeneric(billGenericModel);
        }

        [HttpGet]
        [Route("getBillPaymentRule")]
        public async Task<BillPaymentRule> GetBillPaymentRule()
        {
            string user_id = User.Claims.First(c => c.Type == "UserID").Value;
            return await _billRepo.GetBillPaymentRule(user_id);
        }

        [HttpPut]
        [Route("updateBillPaymentRule")]
        public async Task<int> UpdateBillPaymentRule([FromBody] BillPaymentRule billPaymentRule)
        {
            string user_id = User.Claims.First(c => c.Type == "UserID").Value;
            return await _billRepo.UpdateBillPaymentRule(billPaymentRule, user_id);
        }

        [HttpGet]
        [Route("getUserDebtAnalisys")]
        public IQueryable<UserDebtAnalisysModel> getUserDebtAnalisys()
        {
            return  _billRepo.getUserDebtAnalisys();
        }

        [HttpGet]
        [Route("getBillAnalisys")]
        public List<BillAnalisysModel> getBillAnalisys()
        {
            return _billRepo.getBillAnalisys();
        }
    }
}
