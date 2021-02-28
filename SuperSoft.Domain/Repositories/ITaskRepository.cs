using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface ITaskRepository
	{
		int AddOrUpdateTask(Task task);
		void AttachTaskToLesson(int taskId, int lessonId, int order);
		int AddOrUpdateSubtask(Subtask subtask, int taskId);
		void DeleteTask(int taskId);
		void DeleteSubtask(int subtaskId);
		List<Task> GetTasksByChoosenLesson(int lessonId);
		Task GetTaskById(int taskId);
		List<SubtaskAnswerGroup> GetSubtaskAnswerGroups(int subtaskId);
		int AddOrUpdateAnswerGroup(int subtaskId, SubtaskAnswerGroup answerGroup);
		Subtask GetSubtaskById(int subtaskId);
		void AttachTagsToTask(int taskId, IReadOnlyCollection<int> tagIds);
	}
}