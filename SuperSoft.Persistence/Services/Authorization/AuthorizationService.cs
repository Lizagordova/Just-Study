using SuperSoft.Domain.Services.Authorization;
using Microsoft.Extensions.Options;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Services.Users;
using SuperSoft.Persistence.Helpers;

namespace SuperSoft.Persistence.Services.Authorization
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly IUserReaderService _userReader;
        private readonly IJwtGeneratorService _jwtGeneratorService;
        private readonly IUserEditorService _userEditor;
        	    
        public AuthorizationService(
	        IUserReaderService userReader,
	        IJwtGeneratorService jwtGenerator,
	        IUserEditorService userEditor)
        {
	        _userReader = userReader;
	        _jwtGeneratorService = jwtGenerator;
	        _userEditor = userEditor;
        }
        	    
        public Account AuthenticateUser(string login, string password)
        {
	        var userInfo =  _userReader.GetUserInfo(new UserInfoQuery { PasswordHash = password.GetPasswordHash(), Login = login });
	        if (userInfo == null)
	        {
		        return null;
	        }
	        var account = new Account
	        {
		        Id = userInfo.Id,
		        Email = userInfo.Email,
		        Roles = new [] { userInfo.Role }
	        };
	        userInfo.Token = _jwtGeneratorService.GenerateJwt(account);
	        _userEditor.AddOrUpdateUser(userInfo);

	        return account;
        }
    }
}