using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.UserTasks
{
	public interface IUserTaskReaderService
	{
		List<UserSubtask> GetUserSubtasks(int taskId, int userId);
		UserSubtask GetUserSubtask(int subtaskId, int userId);
		UserTask GetUserTask(int taskId, int userId);
	}
}