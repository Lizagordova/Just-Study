using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class UserRepository : IUserRepository
	{
		public int AddOrUpdateUser(User user)
		{
			throw new System.NotImplementedException();
		}

		public User GetUserInfo(int userId)
		{
			throw new System.NotImplementedException();
		}

		public List<User> GetUsers()
		{
			throw new System.NotImplementedException();
		}
	}
}