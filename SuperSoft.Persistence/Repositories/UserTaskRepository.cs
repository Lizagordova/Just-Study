using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
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
		private const string AddOrUpdateUserSubtaskSp = "TaskRepository_AddOrUpdateUserSubtask";
		private const string GetUserSubtasksSp = "TaskRepository_GetUserSubtasks";
		private const string GetUserSubtaskSp = "TaskRepository_GetUserSubtask";
		private const string GetUserTaskSp = "TaskRepository_GetUserTask";
		private const string AddOrUpdateUserSubtaskAnswerGroupSp = "TaskRepository_AddOrUpdateUserSubtaskAnswerGroup";
		public UserTaskRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public void AddOrUpdateUserSubtask(UserSubtask userSubtask, int userId, int subtaskId, int taskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			DatabaseHelper.CloseConnection(conn);
			throw new System.NotImplementedException();
		}

		public void AddOrUpdateUserSubtaskAnswerGroup(UserSubtaskAnswerGroup answerGroup, int userId, int subtaskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			DatabaseHelper.CloseConnection(conn);
			throw new System.NotImplementedException();
		}

		public List<UserSubtask> GetUserSubtasks(int taskId, int userId)
		{
			var conn = DatabaseHelper.OpenConnection();
			DatabaseHelper.CloseConnection(conn);
			throw new System.NotImplementedException();
		}

		public UserSubtask GetUserSubtask(int subtaskId, int userId)
		{
			throw new System.NotImplementedException();
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
		
		private UserTaskData GetUserTaskData(SqlMapper.GridReader reader)
		{
			var data = new UserTaskData
			{
				UserSubtasks = reader.Read<UserSubtaskUdt>().ToList(),
				UserSubtaskGroups = reader.Read<UserSubtaskAnswerGroupUdt>().ToList()
			};

			return data;
		}

		private DynamicTvpParameters GetUserTaskParam(int taskId, int userId)
		{
			var param = new DynamicTvpParameters();
			param.Add("taskId", taskId);
			param.Add("userId", userId);

			return param;
		}

		private UserTask MapUserTask(UserTaskData data)
		{
			var userTask = new UserTask();
			userTask.UserSubtasks = data.UserSubtasks
				.GroupJoin(data.AnswerGroups,
					u => u.SubtaskId,
					g => g.SubtaskId,
					(u, g) => MapUserSubtask(u, g, data.UserSubtaskGroups))
				.ToList();

			return userTask;
		}

		private UserSubtask MapUserSubtask(UserSubtaskUdt userSubtaskUdt, IEnumerable<SubtaskAnswerGroupUdt> groups, List<UserSubtaskAnswerGroupUdt> userGroups)
		{
			var userSubtask = _mapper.Map<UserSubtaskUdt, UserSubtask>(userSubtaskUdt);
			var subtaskAnswerGroups = groups.Select(_mapper.Map<SubtaskAnswerGroupUdt, SubtaskAnswerGroup>).ToList();
			userSubtask.UserSubtaskAnswerGroups = subtaskAnswerGroups.Join(userGroups,
					s => s.Id,
					ug => ug.AnswerGroupId,
					MapUserSubtaskAnswerGroup)
				.ToList();

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