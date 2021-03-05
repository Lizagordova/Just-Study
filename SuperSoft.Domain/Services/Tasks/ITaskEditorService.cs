using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Tasks
{
	public interface ITaskEditorService
	{
		int AddOrUpdateTask(Task task);
		void AttachTaskToLesson(int taskId, int lessonId, int order);
		int AddOrUpdateSubtask(Subtask subtask, int taskId);
		void DeleteTask(int taskId);
		void DeleteTaskFromLesson(int taskId, int lessonId);
		void DeleteSubtask(int subtaskId);
		void AttachTagsToTask(int taskId, IReadOnlyCollection<int> tagIds);
	}
}