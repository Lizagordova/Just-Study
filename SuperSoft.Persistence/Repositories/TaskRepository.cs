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
	public class TaskRepository : ITaskRepository
	{
		private readonly MapperService _mapper;
		private const string AddOrUpdateTaskSp = "TaskRepository_AddOrUpdateTask";
		private const string AttachTaskToLessonSp = "TaskRepository_AttachTaskToLesson";
		private const string AddOrUpdateSubtaskSp = "TaskRepository_AddOrUpdateSubtask";
		private const string DeleteTaskSp = "TaskRepository_DeleteTask";
		private const string DeleteSubtaskSp = "TaskRepository_DeleteSubtask";
		private const string GetTasksByChoosenLessonSp = "TaskRepository_GetTasksByChoosenLesson";
		private const string GetTaskByIdSp = "TaskRepository_GetTaskById";

		public TaskRepository(
			MapperService mapper
		)
		{
			_mapper = mapper;
		}

		public int AddOrUpdateTask(Task task)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateTaskParam(task);
			var taskId = conn.Query<int>(AddOrUpdateTaskSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return taskId;
		}
		
		public int AttachTaskToLesson(int taskId, int lessonId)
		{
			var conn = DatabaseHelper.OpenConnection();
			DatabaseHelper.CloseConnection(conn);
			throw new System.NotImplementedException();
		}

		public int AddOrUpdateSubtask(Subtask subtask, int taskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			DatabaseHelper.CloseConnection(conn);
			throw new System.NotImplementedException();
		}

		public void DeleteTask(int taskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			DatabaseHelper.CloseConnection(conn);
			throw new System.NotImplementedException();
		}

		public void DeleteSubtask(int subtaskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			DatabaseHelper.CloseConnection(conn);
			throw new System.NotImplementedException();
		}

		public List<Task> GetTasksByChoosenLesson(int lessonId)
		{
			var conn = DatabaseHelper.OpenConnection();
			DatabaseHelper.CloseConnection(conn);
			throw new System.NotImplementedException();
		}

		public UserSubtask GetUserSubtask(int subtaskId, int userId)
		{
			var conn = DatabaseHelper.OpenConnection();
			DatabaseHelper.CloseConnection(conn);
			throw new System.NotImplementedException();
		}

		public Task GetTaskById(int taskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			DatabaseHelper.CloseConnection(conn);
			throw new System.NotImplementedException();
		}

		private DynamicTvpParameters GetAddOrUpdateTaskParam(Task task)
		{
			var param = new DynamicTvpParameters();
			var taskTvp = new TableValuedParameter("task", "UDT_Task");
			var taskUdt = _mapper.Map<Task, TaskUdt>(task);
			taskTvp.AddObjectAsRow(taskUdt);
			param.Add(taskTvp);

			var subtasksTvp = new TableValuedParameter("subtasks", "UDT_Subtask");
			var subtasksUdt = task.Subtasks.Select(_mapper.Map<Subtask, SubtaskUdt>).ToList();
			subtasksTvp.AddObjectAsRow(subtasksUdt);
			taskTvp.AddObjectAsRow(taskUdt);
			param.Add(taskTvp);

			return param;
		}

		
	}
}