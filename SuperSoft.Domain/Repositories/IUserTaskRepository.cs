using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface IUserTaskRepository
	{
		void AddOrUpdateUserSubtask(UserSubtask userSubtask, int userId, int subtaskId, int taskId);
		void AddOrUpdateUserSubtaskAnswerGroup(UserSubtaskAnswerGroup answerGroup, int userId, int subtaskId);
		List<UserSubtask> GetUserSubtasks(int taskId, int userId);
		UserSubtask GetUserSubtask(int subtaskId, int userId);
		UserTask GetUserTask(int taskId, int userId);
	}
}