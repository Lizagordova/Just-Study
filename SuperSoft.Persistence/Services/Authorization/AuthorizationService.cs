using SuperSoft.Domain.Services.Authorization;
using System;
using Microsoft.IdentityModel.Tokens;
using SuperSoft.Domain.enums;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Services.Users;
using SuperSoft.Persistence.Helpers;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace SuperSoft.Persistence.Services.Authorization
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly IUserReaderService _userReader;
        private readonly IOptions<AuthOptions> _authOptions;
        	    
        public AuthorizationService(
	        IUserReaderService userReader,
	        IOptions<AuthOptions> authOptions)
        {
	        _userReader = userReader;
	        _authOptions = authOptions;
        }
        	    
        public Account AuthenticateUser(string email, string password)
        {
	        var userInfo =  _userReader.GetUserInfo(new UserInfoQuery
		        { PasswordHash = password.GetPasswordHash(), Email = email, Login = email });
	        if (userInfo == null)
	        {
		        return null;
	        }
	        return new Account
	        {
		        Id = userInfo.Id,
		        Email = userInfo.Email,
		        Roles = new [] { userInfo.Role }
	        };
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
    }
}