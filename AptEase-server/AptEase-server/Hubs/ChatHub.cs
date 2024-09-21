using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace AptEase_server.Hubs
{
    [AllowAnonymous]
    public class ChatHub : Hub
    {
        public Task SendMessage1(string username, string message, DateTime message_date)
        {
            return Clients.All.SendAsync("ReceiveOne", username, message, message_date);
        }
    }
}
