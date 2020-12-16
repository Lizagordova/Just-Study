using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services
{
	public class ProjectEditorService : IProjectEditorService
	{
		private readonly IProjectRepository _projectRepository;

		public ProjectEditorService(IProjectRepository projectRepository)
		{
			_projectRepository = projectRepository;
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

		public int AttachTaskToProject(int taskId, int projectId)
		{
			throw new System.NotImplementedException();
		}
	}
}