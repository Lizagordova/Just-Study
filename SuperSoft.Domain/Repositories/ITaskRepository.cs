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
		void AddOrUpdateUserSubtask(UserSubtask userSubtask, int userId, int subtaskId, int taskId);
		void AddOrUpdateUserSubtaskAnswerGroup(UserSubtaskAnswerGroup answerGroup, int userId, int subtaskId);
		List<Task> GetTasksByChoosenLesson(int lessonId);
		List<Tag> GetTags();
		List<UserSubtask> GetUserSubtasks(int taskId, int userId);
		UserSubtask GetUserSubtask(int subtaskId, int userId);
		UserTask GetUserTask(int taskId, int userId);
		Task GetTaskById(int taskId);
	}
}