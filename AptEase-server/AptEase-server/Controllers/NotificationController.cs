using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AptEase_server.Models;
using AptEase_server.Repositories;

namespace AptEase_server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationRepository _notificationRepo;

        public NotificationController(INotificationRepository notificationRepo)
        {
            _notificationRepo = notificationRepo;
        }

        [HttpGet]
        [Route("getNotificationsForUser")]
        public IQueryable<Notification> GetNotificationsForUser()
        {
            string user_id = User.Claims.First(c => c.Type == "UserID").Value;
            return _notificationRepo.GetNotificationsForUser(user_id);
        }

        [HttpPost]
        [Route("setNotificationReaded")]
        public async Task SetNotificationReaded([FromBody] Notification notification)
        {
            await _notificationRepo.SetNotificationReaded(notification);
        }
    }
}
