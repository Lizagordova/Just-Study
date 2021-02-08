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
			var subtasks = task.Subtasks;
			foreach (var taskSubtask in subtasks)
			{
				taskSubtask.Id = _taskRepository.AddOrUpdateSubtask(taskSubtask, taskId);
			}

			task.Subtasks = subtasks;

			return taskId;
		}

		public void AttachTaskToLesson(int taskId, int lessonId, int order)
		{
			_taskRepository.AttachTaskToLesson(taskId, lessonId, order);
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

		public void AddOrUpdateUserSubtask(UserSubtask userSubtask, int userId, int subtaskId)
		{
			_userTaskRepository.AddOrUpdateUserSubtask(userSubtask, userId, subtaskId);
		}

		public void AddOrUpdateUserSubtaskAnswerGroup(UserSubtaskAnswerGroup userGroup, int userId)
		{
			_userTaskRepository.AddOrUpdateUserSubtaskAnswerGroup(userGroup, userId);
		}
	}
}