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
			_projectRepository.AttachUserToProject(projectUser);
		}

		public void DeleteProject(int projectId)
		{
			_projectRepository.DeleteProject(projectId);
		}

		public int AddOrUpdateProject(Project project)
		{
			return _projectRepository.AddOrUpdateProject(project);
		}

		public void AttachTaskToProject(int taskId, int projectId)
		{
			_projectRepository.AttachTaskToProject(taskId, projectId);
		}
	}
}