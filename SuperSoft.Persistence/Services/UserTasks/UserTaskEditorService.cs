using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.UserTasks;

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
			_userTaskRepository.AddOrUpdateUserSubtask(userSubtask, userId, subtaskId);
		}

		public void AddOrUpdateUserSubtaskAnswerGroup(UserSubtaskAnswerGroup answerGroup, int userId)
		{
			_userTaskRepository.AddOrUpdateUserSubtaskAnswerGroup(answerGroup, userId);
		}
	}
}