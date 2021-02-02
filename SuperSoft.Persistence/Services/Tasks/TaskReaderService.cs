using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Tasks
{
	public class TaskReaderService : ITaskReaderService
	{
		private readonly ITaskRepository _taskRepository;
		private readonly IUserTaskRepository _userTaskRepository;

		public TaskReaderService(
			ITaskRepository taskRepository,
			IUserTaskRepository userTaskRepository)
		{
			_taskRepository = taskRepository;
			_userTaskRepository = userTaskRepository;
		}

		public List<Task> GetTasksByChoosenLesson(int lessonId)
		{
			var tasks = _taskRepository.GetTasksByChoosenLesson(lessonId);

			return tasks;
		}

		public List<UserSubtask> GetUserSubtasks(int taskId, int userId)
		{
			var userSubtasks = _userTaskRepository.GetUserSubtasks(taskId, userId);

			return userSubtasks;
		}

		public UserSubtask GetUserSubtask(int subtaskId, int userId)
		{
			var userSubtask = _userTaskRepository.GetUserSubtask(subtaskId, userId);

			return userSubtask;
		}

		public UserTask GetUserTask(int taskId, int userId)
		{
			var userTask = _userTaskRepository.GetUserTask(taskId, userId);

			return userTask;
		}

		public Task GetTaskById(int taskId)
		{
			var task = _taskRepository.GetTaskById(taskId);

			return task;
		}
	}
}