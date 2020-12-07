using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services
{
	public class TaskEditorService : ITaskEditorService
	{
		private readonly ITaskRepository _taskRepository;

		public TaskEditorService(ITaskRepository taskRepository)
		{
			_taskRepository = taskRepository;
		}

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
	}
}