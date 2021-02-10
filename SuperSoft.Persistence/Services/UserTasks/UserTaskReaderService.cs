using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.UserTasks;

namespace SuperSoft.Persistence.Services.UserTasks
{
	public class UserTaskReaderService : IUserTaskReaderService
	{
		private readonly IUserTaskRepository _userTaskRepository;
		public UserTaskReaderService(
			IUserTaskRepository userTaskRepository)
		{
			_userTaskRepository = userTaskRepository;
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
			var task = _userTaskRepository.GetUserTask(taskId, userId);

			return task;
		}
	}
}