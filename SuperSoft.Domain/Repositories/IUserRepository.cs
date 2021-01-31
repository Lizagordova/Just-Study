using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface IUserRepository
	{
		int AddOrUpdateUser(User user);
		User GetUserInfo(int userId);
		List<User> GetUsers();
	}
}