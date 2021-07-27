using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Just_Study.Authorization.Api.Enums;
using Just_Study.Authorization.Api.Models;
using JustStudy.Authorization.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Just_Study.Authorization.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly IOptions<AuthOptions> authOptions;
        
        public AuthorizationController(
            IOptions<AuthOptions> authOptions)
        {
            this.authOptions = authOptions;
        }
        
        private List<Account> Accounts => new List<Account>
        {
            new Account
            {
                Id = Guid.NewGuid(),
                Email = "el@gmail.com",
                Password = "gordova",
                Roles = new Role[] { Role.User}
            },
            new Account
            {
                Id = Guid.NewGuid(),
                Email = "user",
                Password = "user",
                Roles = new Role[] {Role.User}
            },
            new Account
            {
                Id = Guid.NewGuid(),
                Email = "admin",
                Password = "admin",
                Roles = new Role[] {Role.Admin}
            },
        };

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody]Login request)
        {
            var user = AuthenticateUser(request.Email, request.Password);

            if (user != null)
            {
                var token = GenerateJWT(user);

                return Ok(new
                {
                    access_token = token
                });
            }

            return Unauthorized();
        }
        
        [HttpGet]
        [Route("login")]
        public IActionResult Login()
        {
            return new JsonResult("EVERYTHING IS GOOOD");
        }

        private Account AuthenticateUser(string email, string password)
        {
            return Accounts.SingleOrDefault(u => u.Email == email && u.Password == password);
        }

        private string GenerateJWT(Account user)
        {
            var authParams = authOptions.Value;

            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

            foreach (var role in user.Roles)
            {
                claims.Add(new Claim("role", role.ToString()));
            }
            
            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifeTime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}