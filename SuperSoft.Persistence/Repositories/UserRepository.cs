using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class UserRepository : IUserRepository
	{
		private readonly MapperService _mapper;
		private const string AddOrUpdateUserSp = "UserRepository_AddOrUpdateUser";
		private const string GetUserInfoSp = "UserRepository_GetUserInfo";
		private const string GetUsersSp = "UserRepository_GetUsers";
		private const string DeleteUserSp = "UserRepository_DeleteUser";

		public UserRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public int AddOrUpdateUser(User user)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateUserParam(user);
			var userId = conn.Query<int>(AddOrUpdateUserSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);
			return userId;
		}

		public User GetUserInfo(int userId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserIdParam(userId);
			var userUdt = conn.Query<UserUdt>(GetUserInfoSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			var user = _mapper.Map<UserUdt, User>(userUdt);
			DatabaseHelper.CloseConnection(conn);

			return user;
		}

		public List<User> GetUsers()
		{
			var conn = DatabaseHelper.OpenConnection();
			var usersUdt = conn.Query<UserUdt>(GetUsersSp, commandType: CommandType.StoredProcedure);
			var users = usersUdt.Select(_mapper.Map<UserUdt, User>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return users;
		}

		public void DeleteUser(int userId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserIdParam(userId);
			conn.Query(DeleteUserSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		private DynamicTvpParameters GetAddOrUpdateUserParam(User user)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("user", "UDT_User");
			var userUdt = _mapper.Map<User, UserUdt>(user);
			tvp.AddObjectAsRow(userUdt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetUserIdParam(int userId)
		{
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);

			return param;
		}
	}
}