using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class UserRepository : IUserRepository
	{
		public IReadOnlyCollection<User> GetUsers()
		{
			var users = new List<User>();
			users.Add(new User(){ FirstName = "Лиза", LastName = "Гордова"});
			users.Add(new User(){ FirstName = "Даша", LastName = "Лунива"});
			return users;
		}

		public int AddOrUpdateUser(User user)
		{
			throw new System.NotImplementedException();
		}

		public void DeleteUser(int userId)
		{
			throw new System.NotImplementedException();
		}
	}
}