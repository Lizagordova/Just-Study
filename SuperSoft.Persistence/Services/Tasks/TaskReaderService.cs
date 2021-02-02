using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Tasks
{
	public class TaskReaderService : ITaskReaderService
	{
		public List<Task> GetTasksByChoosenLesson(int lessonId)
		{
			throw new System.NotImplementedException();
		}

		public List<UserSubtask> GetUserSubtasks(int taskId, int userId)
		{
			throw new System.NotImplementedException();
		}

		public UserSubtask GetUserSubtask(int subtaskId, int userId)
		{
			throw new System.NotImplementedException();
		}

		public UserTask GetUserTask(int taskId, int userId)
		{
			throw new System.NotImplementedException();
		}

		public Task GetTaskById(int taskId)
		{
			throw new System.NotImplementedException();
		}
	}
}