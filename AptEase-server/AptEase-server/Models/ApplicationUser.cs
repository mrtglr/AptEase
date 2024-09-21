using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace AptEase_server.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
        public bool UserRole { get; set; }
        public int DoorNumber { get; set; }
        public string? ProfilePictureUrl { get; set; }
    }

    public class ApplicationUserUpdateModel
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class PasswordUpdateModel
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
