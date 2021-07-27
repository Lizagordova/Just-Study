using System.ComponentModel.DataAnnotations;

namespace Just_Study.Authorization.Api.Models
{
    public class Login
    {
        [Required]
        //[EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}