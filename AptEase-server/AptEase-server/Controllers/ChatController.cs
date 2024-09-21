using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using AptEase_server.Context;
using AptEase_server.Dtos;
using AptEase_server.Hubs;
using AptEase_server.Models;

namespace AptEase_server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;
        private UserManager<ApplicationUser> _userManager;
        private readonly AptEaseContext _context;

        public ChatController(IHubContext<ChatHub> hubContext, UserManager<ApplicationUser> userManager, AptEaseContext context)
        {
            _hubContext = hubContext;
            _userManager = userManager;
            _context = context;
        }

        [Route("send")]
        [HttpPost]
        public IActionResult SendRequest([FromBody] MessageDto msg)
        {
            var user = _userManager.FindByIdAsync(User.Claims.First(c => c.Type == "UserID").Value).Result;

            var message = new MessageDto()
            {
                MessageText = msg.MessageText,
                ApplicationUserChatName = user.FullName + " - No: " + user.DoorNumber,
                MessageDate = DateTime.Now,
            };

            var messageHistoryEntity = new ChatHistory()
            {
                MessageText = msg.MessageText,
                ApplicationUserChatName = user.FullName + " - No: " + user.DoorNumber,
                MessageDate = DateTime.Now,
            };
            _context.ChatHistory.Add(messageHistoryEntity);
            _context.SaveChanges();

            _hubContext.Clients.All.SendAsync("ReceiveOne", message.ApplicationUserChatName, message.MessageText, message.MessageDate);
            return Ok();
        }

        [Route("getChatHistory")]
        [HttpGet]
        public IQueryable<ChatHistory> GetChatHistory()
        {
            return _context.ChatHistory.OrderBy(x => x.MessageDate).AsQueryable();
        }
    }
}
