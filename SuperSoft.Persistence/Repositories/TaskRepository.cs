using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class TaskRepository : ITaskRepository
	{
		public void AddOrUpdateUserTask(UserTask userTask)
		{
			throw new System.NotImplementedException();
		}

		public int AddOrUpdateTask(Task task)
		{
			throw new System.NotImplementedException();
		}

		public void DeleteTask(int taskId)
		{
			throw new System.NotImplementedException();
		}

		public IReadOnlyCollection<Task> GetTasks(int projectId)
		{
			throw new System.NotImplementedException();
		}
	}
}