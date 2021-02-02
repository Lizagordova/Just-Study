using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ITaskRepository
	{
		int AddOrUpdateTask(Task task);
		int AttachTaskToLesson(int taskId, int lessonId);
		int AddOrUpdateSubtask(Subtask subtask, int taskId);
		void DeleteTask(int taskId);
		void DeleteSubtask(int subtaskId);
		List<Task> GetTasksByChoosenLesson(int lessonId);
		Task GetTaskById(int taskId);
	}
}