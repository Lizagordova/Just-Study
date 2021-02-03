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

		public void AttachTaskToLesson(int taskId, int lessonId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAttachTaskToLessonParam(taskId, lessonId);
			conn.Query(AttachTaskToLessonSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public int AddOrUpdateSubtask(Subtask subtask, int taskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateSubtaskParam(subtask, taskId);
			var subtaskId = conn.Query<int>(AddOrUpdateSubtaskSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return subtaskId;
		}

		public void DeleteTask(int taskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetTaskIdParam(taskId);
			conn.Query(DeleteTaskSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public void DeleteSubtask(int subtaskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetSubtaskIdParam(subtaskId);
			conn.Query(DeleteSubtaskSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public List<Task> GetTasksByChoosenLesson(int lessonId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetGetTasksByChoosenLessonParam(lessonId);
			var response = conn.QueryMultiple(GetTasksByChoosenLessonSp, param, commandType: CommandType.StoredProcedure);
			var data = GetTaskData(response);
			var tasks = MapTasks(data);
			DatabaseHelper.CloseConnection(conn);

			return tasks;
		}

		public Task GetTaskById(int taskId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetTaskIdParam(taskId);
			var response = conn.QueryMultiple(GetTaskByIdSp, param, commandType: CommandType.StoredProcedure);
			var data = GetTaskData(response);
			var task = MapTask(data);
			DatabaseHelper.CloseConnection(conn);

			return task;
		}

		private TaskData GetTaskData(SqlMapper.GridReader reader)
		{
			var taskData = new TaskData
			{
				Tasks = reader.Read<TaskUdt>().ToList(),
				Subtasks = reader.Read<SubtaskUdt>().ToList(),
				Tags = reader.Read<TagUdt>().ToList()
			};

			return taskData;
		}
		
		private Task MapTask(TaskData taskData)
		{
			var task = new Task
			{
				Subtasks = taskData.Subtasks.Select(_mapper.Map<SubtaskUdt, Subtask>).ToList(),
				Tags = taskData.Tags.Select(_mapper.Map<TagUdt, Tag>).ToList()
			};

			return task;
		}

		private List<Task> MapTasks(TaskData taskData)
		{
			var tasks = taskData.Tasks
				.GroupJoin(
					taskData.Subtasks,
					t => t.Id,
					s => s.TaskId,
					MapTaskWithSubtasks)
				.GroupJoin(taskData.TagTasks,
					t => t.Id,
					tag => tag.TaskId,
					MapTaskWithTags)
				.ToList();
			
			tasks.ForEach(t =>
			{
				 t.Tags = t.Tags
					.GroupJoin(taskData.Tags,
						tag => tag.Id,
						t => t.Id,
						(tag, tCol) => _mapper.Map<TagUdt, Tag>(tCol.FirstOrDefault()))
					.ToList();
			});//todo: хз работает эта хуйня или нет

			return tasks;
		}

		private Task MapTaskWithTags(Task task, IEnumerable<TagTaskUdt> tagTaskUdts)
		{
			task.Tags = tagTaskUdts.Select(t => new Tag() {Id = t.TagId}).ToList();

			return task;
		}

		private Task MapTaskWithSubtasks(TaskUdt taskUdt, IEnumerable<SubtaskUdt> subtaskUdts)
		{
			var task = _mapper.Map<TaskUdt, Task>(taskUdt);
			task.Subtasks = subtaskUdts.Select(_mapper.Map<SubtaskUdt, Subtask>).ToList();

			return task;
		}

		private Task MapTaskWithTags(Task task, IEnumerable<TagUdt> tagUdts)
		{
			task.Tags = tagUdts.Select(_mapper.Map<TagUdt, Tag>).ToList();

			return task;
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

		private DynamicTvpParameters GetAttachTaskToLessonParam(int taskId, int lessonId)
		{
			var param = new DynamicTvpParameters();
			param.Add("taskId", taskId);
			param.Add("lessonId", lessonId);

			return param;
		}

		private DynamicTvpParameters GetAddOrUpdateSubtaskParam(Subtask subtask, int taskId)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("subtask", "UDT_Subtask");
			var udt = _mapper.Map<Subtask, SubtaskUdt>(subtask);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			param.Add("taskId", taskId);

			return param;
		}

		private DynamicTvpParameters GetTaskIdParam(int taskId)
		{
			var param = new DynamicTvpParameters();
			param.Add("taskId", taskId);

			return param;
		}

		private DynamicTvpParameters GetSubtaskIdParam(int subtaskId)
		{
			var param = new DynamicTvpParameters();
			param.Add("subtaskId", subtaskId);

			return param;
		}

		private DynamicTvpParameters GetGetTasksByChoosenLessonParam(int lessonId)
		{
			var param = new DynamicTvpParameters();
			param.Add("lessonId", lessonId);

			return param;
		}
	}
}