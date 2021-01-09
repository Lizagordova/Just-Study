using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ITaskEditorService
	{
		int AddOrUpdateTask(Task task);
		int AttachTaskToLesson(int taskId, int lessonId);
		int AddOrUpdateSubtask(Subtask subtask, int taskId);
		void DeleteTask(int taskId);
		void DeleteSubtask(int subtaskId);
		void AddOrUpdateUserSubtask(UserSubtask userSubtask, int userId, int subtaskId, int taskId);
	}
}