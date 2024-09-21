using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using AptEase_server.AppConfig;
using AptEase_server.Context;
using AptEase_server.Models;

namespace AptEase_server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly AptEaseContext _context;

        public UserRepository(UserManager<ApplicationUser> userManager, AptEaseContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public IQueryable<ApplicationUser> List()
        {
            return _userManager.Users.Select(u => new ApplicationUser()
            {
                Id = u.Id,
                UserName = u.UserName,
                Email = u.Email,
                FullName = u.FullName,
                PhoneNumber = u.PhoneNumber,
                UserRole = u.UserRole,
                DoorNumber = u.DoorNumber
            }).AsQueryable();
        }

        private async Task<ApplicationUser> GetUserById(string user_id)
        {
            return await _userManager.FindByIdAsync(user_id);
        }

        public async Task<ApplicationUser> GetUser(string user_id)
        {
            var user = await GetUserById(user_id);
            return new ApplicationUser
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                UserRole = user.UserRole,
                DoorNumber = user.DoorNumber
            };
        }

        public async Task<IdentityResult> RemoveUser(string user_id, string admin_user_id)
        {
            var admin = _userManager.FindByIdAsync(admin_user_id).Result;
            
            if (admin.UserRole == true)
            {
                var deleteUser = GetUserById(user_id).Result;

                var deleteUserNotifications = await _context.Notifications.Where(x => x.sendUserId == user_id).ToListAsync();
                if(deleteUserNotifications.Any())
                    _context.RemoveRange(deleteUserNotifications);

                var deleteUserBills = await _context.Bills.Where(x => x.ApplicationUserId == user_id).ToListAsync();
                var deleteUserBillsIds = await _context.Bills.Where(x => x.ApplicationUserId == user_id).Select(y => y.Id).ToListAsync();
                var deleteUserTransections = await _context.Transections.Where(x => deleteUserBillsIds.Contains(x.Id)).ToListAsync();
                if (deleteUserTransections.Any())
                    _context.RemoveRange(deleteUserTransections);
                if (deleteUserBills.Any())
                    _context.RemoveRange(deleteUserBills);

                await _context.SaveChangesAsync();

                return await _userManager.DeleteAsync(deleteUser);
            }

            return null;
        }

        public async void UpdateUserAsync(ApplicationUserUpdateModel userUpdate, string user_id)
        {
            var user = _userManager.FindByIdAsync(user_id).Result;
            user.FullName = userUpdate.FullName;
            user.Email = userUpdate.Email;
            user.PhoneNumber = userUpdate.PhoneNumber;
            _context.Entry(user).State = EntityState.Modified;
            await _userManager.UpdateNormalizedEmailAsync(user);
            _context.SaveChanges();            
        }

        public async Task<bool> ChangePassword(PasswordUpdateModel passwordUpdateModel, string user_id)
        {
            var user = _userManager.FindByIdAsync(user_id).Result;
            var result = await _userManager.ChangePasswordAsync(user, passwordUpdateModel.CurrentPassword, passwordUpdateModel.NewPassword);
            if (result.Succeeded)
            {
                _context.SaveChanges();
                return true;
            }
            else
                return false;
        }
    }

    public interface IUserRepository
    {
        IQueryable<ApplicationUser> List();
        Task<ApplicationUser> GetUser(string user_id);
        Task<IdentityResult> RemoveUser(string user_id, string admin_user_id);
        void UpdateUserAsync(ApplicationUserUpdateModel userUpdate, string user_id);
        Task<bool> ChangePassword(PasswordUpdateModel passwordUpdateModel, string user_id);
    }
}
