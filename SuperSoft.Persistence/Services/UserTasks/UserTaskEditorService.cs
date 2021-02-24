using System.IO;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.UserTasks;
using SuperSoft.Persistence.Helpers;

namespace SuperSoft.Persistence.Services.UserTasks
{
	public class UserTaskEditorService : IUserTaskEditorService
	{
		private readonly IUserTaskRepository _userTaskRepository;
		public UserTaskEditorService(
			IUserTaskRepository userTaskRepository)
		{
			_userTaskRepository = userTaskRepository;
		}

		public void AddOrUpdateUserSubtask(UserSubtask userSubtask, int userId, int subtaskId)
		{
			if (userSubtask.File != null)
			{
				var bytes = FileHelper.GetBytes(userSubtask.File);
				var path = GetPath(subtaskId, userId, userSubtask.File.FileName);
				FileHelper.SaveContent(bytes, path);
				userSubtask.AnswerPath = path;
			}
			_userTaskRepository.AddOrUpdateUserSubtask(userSubtask, userId, subtaskId);
		}

		private string GetPath(int subtaskId, int userId, string fileName)
		{
			//todo: проверить, что будет если добавлять картину
			var path = PathHelper.GetUserSubtaskPath(subtaskId, userId);
			path = $"{path}/{fileName}";

			return path;
		}
		public void AddOrUpdateUserSubtaskAnswerGroup(UserSubtaskAnswerGroup answerGroup, int userId)
		{
			_userTaskRepository.AddOrUpdateUserSubtaskAnswerGroup(answerGroup, userId);
		}

		public void DeleteUserSubtask(int userId, int subtaskId)
		{
			var userSubtask = _userTaskRepository.GetUserSubtask(subtaskId, userId);
			if (userSubtask.AnswerPath != null && File.Exists(userSubtask.AnswerPath))
			{
				File.Delete(userSubtask.AnswerPath);
			}
			_userTaskRepository.DeleteUserSubtask(userId, subtaskId);
		}
	}
}