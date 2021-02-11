﻿using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Tasks
{
	public interface ITaskEditorService
	{
		int AddOrUpdateTask(Task task);
		void AttachTaskToLesson(int taskId, int lessonId, int order);
		int AddOrUpdateSubtask(Subtask subtask, int taskId);
		void DeleteTask(int taskId);
		void DeleteSubtask(int subtaskId);
	}
}