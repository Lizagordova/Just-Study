using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services
{
	public class UserReaderService : IUserReaderService
	{
		private readonly IUserRepository _userRepository;

		public UserReaderService(IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		public IReadOnlyCollection<User> GetUsers()
		{
			return _userRepository.GetUsers();
		}

		public User GetUserInfo(int userId)
		{
			return _userRepository.GetUserInfo(userId);
		}

		public bool Authorization(string email, string password)
		{
			return _userRepository.Authorization(email, password);
		}
	}
}