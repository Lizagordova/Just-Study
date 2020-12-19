using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface IUserReaderService
	{
		IReadOnlyCollection<User> GetUsers();
		User GetUserInfo(int userId);
		bool Authorization(string email, string password);
	}
}