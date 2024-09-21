using AptEase_server.Dtos;
using System.ComponentModel.DataAnnotations;

namespace AptEase_server.Models
{
    public class ChatHistory : MessageDto
    {
        [Key]
        public int Id { get; set; }
    }
}
