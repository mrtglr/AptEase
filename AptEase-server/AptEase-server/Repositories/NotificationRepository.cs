using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AptEase_server.Context;
using AptEase_server.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using AptEase_server.Services;

namespace AptEase_server.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly AptEaseContext _context;
        private UserManager<ApplicationUser> _userManager;
        private IEmailService _emailService;

        public NotificationRepository(AptEaseContext context, UserManager<ApplicationUser> userManager, IEmailService emailService)
        {
            _context = context;
            _userManager = userManager;
            _emailService = emailService;
        }

        private IQueryable<Notification> List()
        {
            return _context.Notifications
                .Include(x => x.ApplicationUser)
                .OrderByDescending(x => x.CreateDate);
        }

        public IQueryable<Notification> GetNotificationsForUser(string user_id)
        {
            return List().Where(x => (x.sendUserId== user_id || x.sendUserId == null) && x.read == false);
        }

        public async Task GenerateNotification(int notification_type, ApplicationUser? target_user)
        {
            NotificationCreateModel notificationCreateModel;

            if (notification_type == 0)
            {
                var header = "New Transection Created";
                var body = "You have new transections. Please check your transection list.";
                var pageLink = "bill-management/transection-list";
                notificationCreateModel = new NotificationCreateModel(header, body, null, pageLink);
                await GenerateNotificationForAdmin(notificationCreateModel);
                _emailService.SendToAdmin();
            }
            if (notification_type == 1)
            {
                var header = "Your Transection Updated";
                var body = "Your transection status updated by Admin. Please check your transection.";
                var pageLink = "bill-management/my-bills";
                notificationCreateModel = new NotificationCreateModel(header, body, target_user.Id, pageLink);
                await GenerateNotification(notificationCreateModel);
                _emailService.Send(target_user.Email, 1, null);
            }
            if (notification_type == 2)
            {
                var header = "New Bills Created";
                var body = "New bill has created and assigned to you.";
                var pageLink = "bill-management/my-bills";
                notificationCreateModel = new NotificationCreateModel(header, body, target_user.Id, pageLink);
                await GenerateNotification(notificationCreateModel);
                _emailService.Send(target_user.Email, 2, null);
            }
            if (notification_type == 3)
            {
                var header = "Bill Payment Rule Updated";
                var body = "Bill payment rule updated by admin. New bill attributes will be announced to you by admin.";
                var pageLink = "dashboard";
                notificationCreateModel = new NotificationCreateModel(header, body, null, pageLink);
                await GenerateNotification(notificationCreateModel);
                _emailService.SendToAll();
            }
            if (notification_type == 4)
            {
                var header = "Overdue Bill Alert!";
                var body = "Your overdue bill get on interest. Please pay your old bill as soon as possible!";
                var pageLink = "bill-management/my-bills";
                notificationCreateModel = new NotificationCreateModel(header, body, target_user.Id, pageLink);
                await GenerateNotification(notificationCreateModel);
                _emailService.Send(target_user.Email, 3, null);
            }
        }

        public async Task SetNotificationReaded(Notification notification)
        {
            notification.read = true;
            _context.Entry(notification).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        private async Task GenerateNotification(NotificationCreateModel notificationCreateModel)
        {
            Notification notification = new Notification();
            notification.Header = notificationCreateModel.Header;
            notification.Body = notificationCreateModel.Body;
            notification.CreateDate = DateTime.Now;
            notification.sendUserId = notificationCreateModel.sendUserId;
            notification.pageLink = notificationCreateModel.pageLink;
            notification.read = false;
            await _context.Notifications.AddAsync(notification);            
            await _context.SaveChangesAsync();
            await ClearOldReadNotificaitons();
        }

        private async Task GenerateNotificationForAdmin(NotificationCreateModel notificationCreateModel)
        {
            notificationCreateModel.sendUserId = _userManager.Users.First(x => x.UserRole == true).Id;
            await GenerateNotification(notificationCreateModel);
        }

        private async Task ClearOldReadNotificaitons()
        {
            var deleteList = await _context.Notifications.Where(x => (DateTime.Now.Day - x.CreateDate.Day) >= 1).ToListAsync();
            if (deleteList.Count > 0)
            {
                _context.RemoveRange(deleteList);
                await _context.SaveChangesAsync();
            }
        }
    }

    public interface INotificationRepository
    {
        IQueryable<Notification> GetNotificationsForUser(string user_id);
        Task GenerateNotification(int notification_type, ApplicationUser? target_user);
        Task SetNotificationReaded(Notification notification);
    }
}
