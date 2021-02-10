using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Tasks;

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
			tasks.ForEach(task =>
			{
				task.Subtasks.ForEach(subtask =>
					{
						subtask.AnswerGroups = _taskRepository.GetSubtaskAnswerGroups(subtask.Id);
					});
			});

			return tasks;
		}

		public Task GetTaskById(int taskId)
		{
			var task = _taskRepository.GetTaskById(taskId);

			return task;
		}
	}
}