using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ITaskRepository
	{
		void AddOrUpdateUserTask(UserTask userTask);
		int AddOrUpdateTask(Task task);
		void DeleteTask(int taskId);
		IReadOnlyCollection<Task> GetTasks(int projectId);
	}
}