using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AptEase_server.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }
        public string Header { get; set; }
        public string Body { get; set; }
        public DateTime CreateDate { get; set; }
        public string? sendUserId { get; set; }
        [ForeignKey("sendUserId")]
        public virtual ApplicationUser? ApplicationUser { get; set; }
        public string? pageLink { get; set; }
        public bool read { get; set; }
    }

    public class NotificationCreateModel
    {
        public string Header { get; set; }
        public string Body { get; set; }
        public string? sendUserId { get; set; }
        public string? pageLink { get; set; }

        public NotificationCreateModel(string header, string body, string? sendUserId, string? pageLink)
        {
            Header = header;
            Body = body;
            this.sendUserId = sendUserId;
            this.pageLink = pageLink;
        }
    }
}
