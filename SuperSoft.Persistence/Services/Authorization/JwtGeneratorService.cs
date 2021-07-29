using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services.Authorization;
using System;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using SuperSoft.Domain.Services.Users;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace SuperSoft.Persistence.Services.Authorization
{
    public class JwtGeneratorService : IJwtGeneratorService
    {
        
        private readonly IOptions<AuthOptions> _authOptions;

        public JwtGeneratorService(
            IOptions<AuthOptions> authOptions)
        {
            _authOptions = authOptions;
        }
        
        public string GenerateJwt(Account user)
        {
            var authParams = _authOptions.Value;
                
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

        public string GenerateJwt(User user)
        {
            var account = new Account
            {
                Id = user.Id,
                Email = user.Email,
                Roles = new [] { user.Role }
            };
            var token = GenerateJwt(account);

            return token;
        }
    }
}