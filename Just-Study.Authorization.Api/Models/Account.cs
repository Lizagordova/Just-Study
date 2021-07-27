using System;
using Just_Study.Authorization.Api.Enums;

namespace Just_Study.Authorization.Api.Models
{
    public class Account
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role[] Roles { get; set; }
    }
}