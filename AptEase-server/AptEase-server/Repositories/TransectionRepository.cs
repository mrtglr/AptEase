using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AptEase_server.Context;
using AptEase_server.Models;

namespace AptEase_server.Repositories
{
    public class TransectionRepository : ITransectionRepository
    {
        private readonly AptEaseContext _context;
        private readonly IBillRepository _billRepo;
        private readonly INotificationRepository _notificationRepo;

        public TransectionRepository(AptEaseContext context, IBillRepository billRepo, INotificationRepository notificationRepo)
        {
            _context = context;
            _billRepo = billRepo;
            _notificationRepo = notificationRepo;
        }

        public IQueryable<Transection> List()
        {
            return _context.Transections
                .Include(x => x.Bill)
                .ThenInclude(x => x.ApplicationUser)
                .OrderByDescending(x => x.TransectionDate);
        }

        public Transection GetTransectionById(int transection_id)
        {
            return List().FirstOrDefault(x => x.Id == transection_id);
        }

        public IQueryable<Transection> ListForUser(string user_id)
        {
            return List()
                .Include(x => x.Bill)
                .ThenInclude(y => y.ApplicationUser)
                .Where(z => z.Bill.ApplicationUserId == user_id)
                .AsQueryable();
        }

        public async Task<int> CreateTransection(Transection transection, string user_id)
        {
            if (!_context.Transections.Any(x => x.BillId == transection.BillId))
            {
                transection.TransectionStatus = 0;
                transection.TransectionDate = DateTime.Now;
                transection.ModifyDate = DateTime.Now;
                _context.Transections.Add(transection);
                _context.SaveChanges();
                await _notificationRepo.GenerateNotification(0, null);
                return 1;
            }
            return 0;
        }

        private int UpdateTransection(Transection transection)
        {
            _context.Entry(transection).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
            _context.SaveChanges();
            return transection.Id;
        }

        public async Task<int> ApproveTransection(int transection_id)
        {
            var transection = GetTransectionById(transection_id);
            transection.TransectionStatus = 1;
            transection.ModifyDate = DateTime.Now;
            await _billRepo.ApproveBillPaymentAsync((int)transection.BillId);
            await _notificationRepo.GenerateNotification(1, transection.Bill.ApplicationUser);
            return UpdateTransection(transection);
        }

        public async Task<int> RejectTransection(int transection_id)
        {
            var transection = GetTransectionById(transection_id);
            transection.TransectionStatus = 2;
            transection.ModifyDate = DateTime.Now;
            await _notificationRepo.GenerateNotification(1, transection.Bill.ApplicationUser);
            return UpdateTransection(transection);
        }
    }
    public interface ITransectionRepository
    {
        IQueryable<Transection> List();
        Transection GetTransectionById(int transection_id);
        IQueryable<Transection> ListForUser(string user_id);
        Task<int> CreateTransection(Transection transection, string user_id);
        Task<int> ApproveTransection(int transection_id);
        Task<int> RejectTransection(int transection_id);
    }
}
