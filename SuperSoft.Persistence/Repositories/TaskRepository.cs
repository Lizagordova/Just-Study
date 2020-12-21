using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class TaskRepository : ITaskRepository
	{
		private readonly MapperService _mapper;
		private const string AddOrUpdateUserTaskSp = "TaskRepository_AddOrUpdateUserTask";
		private const string AddOrUpdateTaskSp = "TaskRepository_AddOrUpdateTask";
		private const string GetTasksSp = "TaskRepository_GetTasks";
		private const string GetUserTasksSp = "TaskRepository_GetUserTasks";
		private const string DeleteTaskSp = "TaskRepository_DeleteTask";
		public TaskRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public void AddOrUpdateUserTask(UserTask userTask)
		{
			var param = GetAddOrUpdateUserTaskParam(userTask);
			var conn = DatabaseHelper.OpenConnection();
			conn.Query(AddOrUpdateUserTaskSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}
		
		public int AddOrUpdateTask(Task task)
		{
			var param = GetAddOrUpdateTaskParam(task);
			var conn = DatabaseHelper.OpenConnection();
			var taskId = conn.Query<int>(AddOrUpdateTaskSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return taskId;
		}

		public void DeleteTask(int taskId)
		{
			var param = new DynamicTvpParameters();
			param.Add("taskId", taskId);
			var conn = DatabaseHelper.OpenConnection();
			conn.Query(DeleteTaskSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public IReadOnlyCollection<Task> GetTasks(int projectId)
		{
			var param = new DynamicTvpParameters();
			param.Add("projectId", projectId);
			var conn = DatabaseHelper.OpenConnection();
			var data = conn.QueryMultiple(GetTasksSp, param, commandType: CommandType.StoredProcedure);
			var tasks = MapTasks(data);
			DatabaseHelper.CloseConnection(conn);

			return tasks;
		}

		public IReadOnlyCollection<UserTask> GetUserTasks(int userId)
		{
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);
			var conn = DatabaseHelper.OpenConnection();
			var data = conn.QueryMultiple(GetUserTasksSp, param, commandType: CommandType.StoredProcedure);
			var userTasks = MapUserTasks(data);
			DatabaseHelper.CloseConnection(conn);

			return userTasks;
		}

		private IReadOnlyCollection<UserTask> MapUserTasks(SqlMapper.GridReader reader)
		{
			var tasksUdt = reader.Read<TaskUdt>();
			var userTasksUdt = reader.Read<UserTaskUdt>();
			var userTasks = tasksUdt
				.GroupJoin(userTasksUdt,
					ut => ut.Id,
					t => t.TaskId,
					MapUserTask)
				.ToList();

			return userTasks;
		}

		private IReadOnlyCollection<Task> MapTasks(SqlMapper.GridReader reader)
		{
			var tasksUdt = reader.Read<TaskUdt>();
			var userTasksUdt = reader.Read<UserTaskUdt>();
			var tasks = tasksUdt
				.GroupJoin(userTasksUdt,
					ut => ut.Id,
					t => t.TaskId,
					MapTask)
				.ToList();

			return tasks;
		}
		
		private Task MapTask(TaskUdt taskUdt, IEnumerable<UserTaskUdt> userTaskUdt)
		{
			var task = _mapper.Map<TaskUdt, Task>(taskUdt);
			foreach (var udt in userTaskUdt)
			{
				if (udt.Role == (int)TaskRole.Responsible)
				{
					task.Responsible = udt.UserId;
				}
				else if (udt.Role == (int)TaskRole.Tester)
				{
					task.Tester = udt.UserId;
				}
				else if (udt.Role == (int)TaskRole.Author)
				{
					task.Author = udt.UserId;
				}
			}

			return task;
		}

		private UserTask MapUserTask(TaskUdt taskUdt, IEnumerable<UserTaskUdt> userTaskUdt)
		{
			var userTask = new UserTask();
			userTask.Task = _mapper.Map<TaskUdt, Task>(taskUdt);
			foreach (var udt in userTaskUdt)
			{
				if (udt.Role == (int)TaskRole.Responsible)
				{
					userTask.Task.Responsible = udt.UserId;
					userTask.TimeSpent = udt.TimeSpent;
				}
				else if (udt.Role == (int)TaskRole.Tester)
				{
					userTask.Task.Tester = udt.UserId;
				}
				else if (udt.Role == (int)TaskRole.Author)
				{
					userTask.Task.Author = udt.UserId;
				}
			}

			return userTask;
		}

		private DynamicTvpParameters GetAddOrUpdateUserTaskParam(UserTask userTask)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("userTask", "UDT_User_Task");
			var udt = _mapper.Map<UserTask, UserTaskUdt>(userTask);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetAddOrUpdateTaskParam(Task task)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("task", "UDT_Task");
			var udt = _mapper.Map<Task, TaskUdt>(task);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}
	}
}