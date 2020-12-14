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
	}
}