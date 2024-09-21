namespace AptEase_server.Models
{
    public class RegisterModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Fullname { get; set; }
        public bool UserRole { get; set; }
        public string PhoneNumber { get; set; }
        public int DoorNumber { get; set;}
    }

    public class RegisterCreadentials
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
