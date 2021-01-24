using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface IUserReaderService
	{
		User GetUserInfo(int userId);
		List<User> GetUsers();
	}
}