using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

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

		public User GetUserInfo(int userId)
		{
			return _userRepository.GetUserInfo(userId);
		}

		public List<User> GetUsers()
		{
			return _userRepository.GetUsers();
		}
	}
}