using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class ProjectRepository : IProjectRepository
	{
		public IReadOnlyCollection<User> GetProjectUsers(int projectId)
		{
			throw new System.NotImplementedException();
		}

		public IReadOnlyCollection<ProjectUser> GetProjects()
		{
			throw new System.NotImplementedException();
		}

		public void AttachUserToProject(ProjectUser projectUser)
		{
			throw new System.NotImplementedException();
		}

		public void DeleteProject(int projectId)
		{
			throw new System.NotImplementedException();
		}

		public int AddOrUpdateProject(Project project)
		{
			throw new System.NotImplementedException();
		}
	}
}