using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole[] Roles { get; set; }
        public string Token { get; set; }
    }
}