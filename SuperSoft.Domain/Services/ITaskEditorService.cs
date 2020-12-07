using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ITaskEditorService
	{
		void AddOrUpdateUserTask(UserTask userTask);
		int AddOrUpdateTask(Task task);
		void DeleteTask(int taskId);
	}
}