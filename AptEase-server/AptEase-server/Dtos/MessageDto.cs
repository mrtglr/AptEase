using AptEase_server.Models;

namespace AptEase_server.Dtos
{
    public class MessageDto
    {
        public string? ApplicationUserChatName { get; set; }
        public string MessageText { get; set; }
        public DateTime? MessageDate { get; set; }
    }
}
