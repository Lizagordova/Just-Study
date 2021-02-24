using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.UserTasks
{
	public interface IUserTaskEditorService
	{
		void AddOrUpdateUserSubtask(UserSubtask userSubtask, int userId, int subtaskId);
		void AddOrUpdateUserSubtaskAnswerGroup(UserSubtaskAnswerGroup answerGroup, int userId);
		void DeleteUserSubtask(int userId, int subtaskId);
	}
}