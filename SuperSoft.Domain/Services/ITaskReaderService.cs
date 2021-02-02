using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ITaskReaderService
	{
		List<Task> GetTasksByChoosenLesson(int lessonId);
		List<UserSubtask> GetUserSubtasks(int taskId, int userId);
		UserSubtask GetUserSubtask(int subtaskId, int userId);
		UserTask GetUserTask(int taskId, int userId);
		Task GetTaskById(int taskId);
	}
}