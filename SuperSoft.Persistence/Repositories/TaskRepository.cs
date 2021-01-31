using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class TaskRepository : ITaskRepository
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

		public List<Task> GetTasksByChoosenLesson(int lessonId)
		{
			throw new System.NotImplementedException();
		}

		public List<Tag> GetTags()
		{
			throw new System.NotImplementedException();
		}

		public List<UserSubtask> GetUserSubtasks(int taskId, int userId)
		{
			throw new System.NotImplementedException();
		}

		public UserSubtask GetUserSubtask(int subtaskId, int userId)
		{
			throw new System.NotImplementedException();
		}

		public UserTask GetUserTask(int taskId, int userId)
		{
			throw new System.NotImplementedException();
		}

		public Task GetTaskById(int taskId)
		{
			throw new System.NotImplementedException();
		}
	}
}