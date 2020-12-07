using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Repositories
{
	public interface IProjectRepository
	{
		IReadOnlyCollection<User> GetProjectUsers(int projectId);
		IReadOnlyCollection<ProjectUser> GetProjects();
		void AttachUserToProject(ProjectUser projectUser);
		void DeleteProject(int projectId);
		int AddOrUpdateProject(Project project);
	}
}