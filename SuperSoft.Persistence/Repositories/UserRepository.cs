using System.Collections.Generic;
using System.Data;
using System.Linq;
using AutoMapper;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class UserRepository : IUserRepository
	{
		private readonly MapperService _mapper;
		private const string GetUsersSp = "UserRepository_GetUsers";
		private const string AddOrUpdateUserSp = "UserRepository_AddOrUpdateUser";
		private const string DeleteUserSp = "UserRepository_DeleteUser";
		private const string GetUserInfoSp = "UserRepository_GetUserInfo";
		private const string AuthorizationSp = "UserRepozitory_Authorization";
		private const string GetUserInfoWithAuthorizationSp = "UserRepozitory_GetUserInfoWithAuthorization";
		public UserRepository(MapperService mapper)
		{
			_mapper = mapper;
		}

		public IReadOnlyCollection<User> GetUsers()
		{
			var conn = DatabaseHelper.OpenConnection();
			var usersUdt = conn.Query<UserUdt>(GetUsersSp, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
			var users = usersUdt.Select(_mapper.Map<UserUdt, User>).ToList();

			return users;
		}

		public int AddOrUpdateUser(User user)
		{
			var param = GetAddOrUpdateUserParam(user);
			var conn = DatabaseHelper.OpenConnection();
			var userId = conn.Query<int>(AddOrUpdateUserSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return userId;
		}

		public void DeleteUser(int userId)
		{
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);
			var conn = DatabaseHelper.OpenConnection();
			conn.Query(DeleteUserSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public User GetUserInfo(int userId)
		{
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);
			var conn = DatabaseHelper.OpenConnection();
			var userUdt = conn.Query<UserUdt>(GetUserInfoSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);
			var user = _mapper.Map<UserUdt, User>(userUdt);

			return user;
		}

		public bool Authorization(string email, string password)
		{
			var param = new DynamicTvpParameters();
			param.Add("email", email);
			param.Add("password", password);
			var conn = DatabaseHelper.OpenConnection();
			var exist = conn.Query<bool>(AuthorizationSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();

			return exist;
		}

		public User GetUserInfoWithAuthorization(string email, string password)
		{
			var param = new DynamicTvpParameters();
			param.Add("email", email);
			param.Add("password", password);
			var conn = DatabaseHelper.OpenConnection();
			var userUdt = conn.Query<UserUdt>(GetUserInfoWithAuthorizationSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			var user = _mapper.Map<UserUdt, User>(userUdt);

			return user;
		}

		private DynamicTvpParameters GetAddOrUpdateUserParam(User user)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("user", "UDT_User");
			var udt = _mapper.Map<User, UserUdt>(user);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}
	}
}