using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Tasks
{
	public class TaskEditorService : ITaskEditorService
	{
		private readonly ITaskRepository _taskRepository;
		private readonly IUserTaskRepository _userTaskRepository;

		public TaskEditorService(
			ITaskRepository taskRepository,
			IUserTaskRepository userTaskRepository)
		{
			_taskRepository = taskRepository;
			_userTaskRepository = userTaskRepository;
		}

		public int AddOrUpdateTask(Task task)
		{
			var taskId = _taskRepository.AddOrUpdateTask(task);

			return taskId;
		}

		public void AttachTaskToLesson(int taskId, int lessonId)
		{
			_taskRepository.AttachTaskToLesson(taskId, lessonId);
		}

		public int AddOrUpdateSubtask(Subtask subtask, int taskId)
		{
			var subtaskId = _taskRepository.AddOrUpdateSubtask(subtask, taskId);

			return subtaskId;
		}

		public void DeleteTask(int taskId)
		{
			_taskRepository.DeleteTask(taskId);
		}

		public void DeleteSubtask(int subtaskId)
		{
			_taskRepository.DeleteSubtask(subtaskId);
		}

		public void AddOrUpdateUserSubtask(UserSubtask userSubtask, int userId, int subtaskId, int taskId)
		{
			_userTaskRepository.AddOrUpdateUserSubtask(userSubtask, userId, subtaskId, taskId);
		}

		public void AddOrUpdateUserSubtaskAnswerGroup(UserSubtaskAnswerGroup userGroup, int userId, int subtaskId)
		{
			_userTaskRepository.AddOrUpdateUserSubtaskAnswerGroup(userGroup, userId, subtaskId);
		}
	}
}