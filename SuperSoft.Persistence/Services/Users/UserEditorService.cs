using System;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Authorization;
using SuperSoft.Domain.Services.Users;

namespace SuperSoft.Persistence.Services.Users
{
	public class UserEditorService : IUserEditorService
	{
		private readonly IUserRepository _userRepository;
		private readonly IAuthorizationService _authorizationService;

		public UserEditorService(
			IUserRepository userRepository,
			IAuthorizationService authorizationService)
		{
			_userRepository = userRepository;
			_authorizationService = authorizationService;
		}

		public User AddOrUpdateUser(User user)
		{
			user.Token = string.IsNullOrEmpty(user.Token) ? GetToken(user) : user.Token;
			var userId = _userRepository.AddOrUpdateUser(user);
			user.Id = userId;

			return user;
		}

		public void DeleteUser(int userId)
		{
			//TODO: Надо удалять комменты юзера, потому что это мб потенциальной проблемой
			_userRepository.DeleteUser(userId);
		}

		private string GetToken(User user)
		{
			var account = _authorizationService.AuthenticateUser(user.Email, user.PasswordHash);
			var token = _authorizationService.GenerateJwt(account);

			return token;
		}
	}
}