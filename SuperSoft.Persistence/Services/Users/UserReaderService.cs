using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Users;

namespace SuperSoft.Persistence.Services.Users
{
	public class UserReaderService : IUserReaderService
	{
		private readonly IUserRepository _userRepository;

		public UserReaderService(
			IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		public User GetUserInfo(UserInfoQuery query)
		{
			var user = _userRepository.GetUserInfo(query);

			return user;
		}

		public List<User> GetUsers()
		{
			return _userRepository.GetUsers();
		}

		public bool CheckToken(string token)
		{
			var exists = _userRepository.CheckToken(token);

			return exists;
		}
	}
}