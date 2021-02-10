using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;

namespace SuperSoft.Domain.Services.Users
{
	public interface IUserReaderService
	{
		User GetUserInfo(UserInfoQuery query);
		List<User> GetUsers();
		bool CheckToken(string token);
	}
}