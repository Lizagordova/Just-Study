﻿using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Tasks
{
	public class TaskEditorService : ITaskEditorService
	{
		public int AddOrUpdateTask(Task task)
		{
			throw new System.NotImplementedException();
		}

		public int AttachTaskToLesson(int taskId, int lessonId)
		{
			throw new System.NotImplementedException();
		}

		public int AddOrUpdateSubtask(Subtask subtask, int taskId)
		{
			throw new System.NotImplementedException();
		}

		public void DeleteTask(int taskId)
		{
			throw new System.NotImplementedException();
		}

		public void DeleteSubtask(int subtaskId)
		{
			throw new System.NotImplementedException();
		}

		public void AddOrUpdateUserSubtask(UserSubtask userSubtask, int userId, int subtaskId, int taskId)
		{
			throw new System.NotImplementedException();
		}

		public void AddOrUpdateUserSubtaskAnswerGroup(UserSubtaskAnswerGroup answerGroup, int userId, int subtaskId)
		{
			throw new System.NotImplementedException();
		}
	}
}