﻿using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;

namespace SuperSoft.Domain.Repositories
{
	public interface IUserRepository
	{
		int AddOrUpdateUser(User user);
		User GetUserInfo(UserInfoQuery query);
		bool CheckToken(string token);
		List<User> GetUsers();
		void DeleteUser(int userId);
	}
}