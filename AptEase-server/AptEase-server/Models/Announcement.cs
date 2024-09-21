using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AptEase_server.Models
{
    public class Announcement
    {
        [Key]
        public int Id { get; set; }
        public string Header { get; set; }
        public string Body { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}
