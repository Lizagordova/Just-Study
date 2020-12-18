using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface IProjectEditorService
	{
		void AttachUserToProject(ProjectUser projectUser);
		void DeleteProject(int projectId);
		int AddOrUpdateProject(Project project);
		void AttachTaskToProject(int taskId, int projectId);
	}
}