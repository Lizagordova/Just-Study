﻿using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Data;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class UserTaskRepository : IUserTaskRepository
	{
		private readonly MapperService _mapper;
		private const string AddOrUpdateUserSubtaskSp = "UserTaskRepository_AddOrUpdateUserSubtask";
		private const string GetUserSubtasksSp = "UserTaskRepository_GetUserSubtasks";
		private const string GetUserSubtaskSp = "UserTaskRepository_GetUserSubtask";
		private const string GetUserTaskSp = "UserTaskRepository_GetUserTask";
		private const string AddOrUpdateUserSubtaskAnswerGroupSp = "UserTaskRepository_AddOrUpdateUserSubtaskAnswerGroup";
		private const string GetUserSubtasksAnswerGroupsSp = "UserTaskRepository_GetUserSubtasksAnswerGroups";
		private const string DeleteUserSubtaskSp = "UserTaskRepository_DeleteUserSubtask";

		public UserTaskRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public void AddOrUpdateUserSubtask(UserSubtask userSubtask, int userId, int subtaskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateUserSubtaskParam(userSubtask, userId, subtaskId);
			conn.Query(AddOrUpdateUserSubtaskSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public void AddOrUpdateUserSubtaskAnswerGroup(UserSubtaskAnswerGroup answerGroup, int userId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserSubtaskAnswerGroupParam(answerGroup, userId);
			conn.Query(AddOrUpdateUserSubtaskAnswerGroupSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public List<UserSubtask> GetUserSubtasks(int taskId, int userId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserTaskParam(taskId, userId);
			var response = conn.QueryMultiple(GetUserSubtasksSp, param, commandType: CommandType.StoredProcedure);
			var data = GetUserSubtaskData(response);
			var userSubtasks = MapUserSubtasks(data);
			DatabaseHelper.CloseConnection(conn);

			return userSubtasks;
		}

		private UserSubtaskData GetUserSubtaskData(SqlMapper.GridReader reader)
		{
			var data = new UserSubtaskData()
			{
				UserSubtasks = reader.Read<UserSubtaskUdt>().ToList(),
				UserAnswerGroups = reader.Read<UserSubtaskAnswerGroupUdt>().ToList()
			};

			return data;
		}

		private List<UserSubtask> MapUserSubtasks(UserSubtaskData data)
		{
			var userSubtasks = data.UserSubtasks
				.GroupJoin(data.UserAnswerGroups,
					g => g.SubtaskId,
					g => g.SubtaskId,
					MapUserSubtask)
				.ToList();

			return userSubtasks;
		}

		public UserSubtask GetUserSubtask(int subtaskId, int userId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserSubtaskParam(subtaskId, userId);
			var response = conn.QueryMultiple(GetUserSubtaskSp, param, commandType: CommandType.StoredProcedure);
			var data = GetUserSubtaskData(response);
			var userSubtask = MapUserSubtask(data);
			DatabaseHelper.CloseConnection(conn);

			return userSubtask;
		}

		public UserTask GetUserTask(int taskId, int userId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserTaskParam(taskId, userId);
			var response = conn.QueryMultiple(GetUserTaskSp, param, commandType: CommandType.StoredProcedure);
			var data = GetUserTaskData(response);
			var userTask = MapUserTask(data);
			DatabaseHelper.CloseConnection(conn);

			return userTask;
		}

		public UserTask GetUserSubtasksAnswerGroups(int taskId, int userId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserTaskParam(taskId, userId);
			var response = conn.QueryMultiple(AddOrUpdateUserSubtaskAnswerGroupSp, param, commandType: CommandType.StoredProcedure);
			var data = GetUserTaskData(response);
			var userTask = MapUserTask(data);
			DatabaseHelper.CloseConnection(conn);

			return userTask;
		}

		public void DeleteUserSubtask(int userId, int subtaskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetUserSubtaskParam(subtaskId, userId);
			conn.Query(DeleteUserSubtaskSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		private DynamicTvpParameters GetAddOrUpdateUserSubtaskParam(UserSubtask userSubtask, int userId, int subtaskId)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("userSubtask", "UDT_User_Subtask");
			var udt = _mapper.Map<UserSubtask, UserSubtaskUdt>(userSubtask);
			udt.SubtaskId = subtaskId;
			udt.UserId = userId;
			udt.SubtaskId = subtaskId;
			udt.UserId = userId;
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetUserTaskParam(int taskId, int userId)
		{
			var param = new DynamicTvpParameters();
			param.Add("taskId", taskId);
			param.Add("userId", userId);

			return param;
		}

		private DynamicTvpParameters GetUserSubtaskParam(int subtaskId, int userId)
		{
			var param = new DynamicTvpParameters();
			param.Add("subtaskId", subtaskId);
			param.Add("userId", userId);

			return param;
		}

		private DynamicTvpParameters GetUserSubtaskAnswerGroupParam(UserSubtaskAnswerGroup answerGroup, int userId)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("answerGroup", "UDT_UserSubtaskAnswerGroup");
			var udt = _mapper.Map<UserSubtaskAnswerGroup, UserSubtaskAnswerGroupUdt>(answerGroup);
			udt.UserId = userId;
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private UserTaskData GetUserTaskData(SqlMapper.GridReader reader)
		{
			var data = new UserTaskData
			{
				UserSubtasks = reader.Read<UserSubtaskUdt>().ToList(),
				AnswerGroups = reader.Read<SubtaskAnswerGroupUdt>().ToList(),
				UserSubtaskGroups = reader.Read<UserSubtaskAnswerGroupUdt>().ToList(),
				SubtaskIds = reader.Read<int>().ToList()
			};

			return data;
		}

		private UserTask MapUserTask(UserTaskData data)
		{
			var userSubtasks = data.SubtaskIds
				.GroupJoin(data.UserSubtaskGroups,
					sId => sId,
					sg => sg.SubtaskId,
					MapUserSubtask)
				.ToList();
			foreach (var userSubtask in userSubtasks)
			{
				foreach (var userSubtaskUdt in data.UserSubtasks)
				{
					if (userSubtask.SubtaskId == userSubtaskUdt.SubtaskId)
					{
						userSubtask.Answer = userSubtaskUdt.Answer;
						userSubtask.AnswerPath = userSubtaskUdt.AnswerPath;
						userSubtask.Status = (CompletingStatus)userSubtaskUdt.Status;
					}
				}
			}
			var userTask = new UserTask
			{
				UserSubtasks = userSubtasks
			};

			return userTask;
		}

		private UserSubtask MapUserSubtask(UserSubtask userSubtask, UserSubtaskUdt userSubtaskUdt)
		{
			var fullUserSubtask = _mapper.Map<UserSubtaskUdt, UserSubtask>(userSubtaskUdt);
			fullUserSubtask.UserSubtaskAnswerGroups = userSubtask.UserSubtaskAnswerGroups;

			return userSubtask;
		}

		private UserSubtask MapUserSubtask(int subtaskId, IEnumerable<UserSubtaskAnswerGroupUdt> userGroups)
		{
			var userSubtask = new UserSubtask
			{
				SubtaskId = subtaskId,
				UserSubtaskAnswerGroups = userGroups.Select(_mapper.Map<UserSubtaskAnswerGroupUdt, UserSubtaskAnswerGroup>).ToList()
			};

			return userSubtask;
		}

		private UserSubtask MapUserSubtask(UserSubtaskUdt userSubtaskUdt, IEnumerable<UserSubtaskAnswerGroupUdt> userGroups)
		{
			var userSubtask = _mapper.Map<UserSubtaskUdt, UserSubtask>(userSubtaskUdt);
			/*userSubtask.UserSubtaskAnswerGroups = userSubtask.UserSubtaskAnswerGroups
				.Join(userGroups,
					s => s,
					ug => ug.AnswerGroupId,
					MapUserSubtaskAnswerGroup)
				.ToList();*/

			return userSubtask;
		}

		private UserSubtask MapUserSubtask(UserSubtaskData data)
		{
			var userSubtask = _mapper.Map<UserSubtaskUdt, UserSubtask>(data.UserSubtasks.FirstOrDefault());
			/*userSubtask.UserSubtaskAnswerGroups = userSubtask.UserSubtaskAnswerGroups
				.Join(userGroups,
					s => s,
					ug => ug.AnswerGroupId,
					MapUserSubtaskAnswerGroup)
				.ToList();*/

			return userSubtask;
		}

		private UserSubtaskAnswerGroup MapUserSubtaskAnswerGroup(SubtaskAnswerGroup answerGroup, UserSubtaskAnswerGroupUdt userGroupUdt)
		{
			var userGroup = _mapper.Map<UserSubtaskAnswerGroupUdt, UserSubtaskAnswerGroup>(userGroupUdt);
			userGroup.AnswerGroupId = answerGroup.Id;

			return userGroup;
		}
	}
}