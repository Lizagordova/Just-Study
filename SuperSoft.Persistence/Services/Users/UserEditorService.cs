using System;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Users;

namespace SuperSoft.Persistence.Services.Users
{
	public class UserEditorService : IUserEditorService
	{
		private readonly IUserRepository _userRepository;

		public UserEditorService(
			IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		public User AddOrUpdateUser(User user)
		{
			user.PasswordHash = user.PasswordHash;
			user.Token = !string.IsNullOrEmpty(user.Token) ? GetToken() : user.Token;
			var userId = _userRepository.AddOrUpdateUser(user);
			user.Id = userId;

			return user;
		}

		public void DeleteUser(int userId)
		{
			//TODO: Надо удалять комменты юзера, потому что это мб потенциальной проблемой
			_userRepository.DeleteUser(userId);
		}

		private string GetToken()
		{
			var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());

			return token;
		}
	}
}