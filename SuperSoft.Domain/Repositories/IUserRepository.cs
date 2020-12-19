using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface IUserRepository
	{
		IReadOnlyCollection<User> GetUsers();
		int AddOrUpdateUser(User user);
		void DeleteUser(int userId);
		User GetUserInfo(int userId);
		bool Authorization(string email, string password);
	}
}