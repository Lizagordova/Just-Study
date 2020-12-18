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
			_taskRepository.AddOrUpdateUserTask(userTask);
		}

		public int AddOrUpdateTask(Task task)
		{
			return _taskRepository.AddOrUpdateTask(task);
		}

		public void DeleteTask(int taskId)
		{
			_taskRepository.DeleteTask(taskId);
		}
	}
}