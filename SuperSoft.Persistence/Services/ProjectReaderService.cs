using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services
{
	public class ProjectReaderService : IProjectReaderService
	{
		private readonly IProjectRepository _projectRepository;

		public ProjectReaderService(IProjectRepository projectRepository)
		{
			_projectRepository = projectRepository;
		}

		public IReadOnlyCollection<User> GetProjectUsers(int projectId)
		{
			throw new System.NotImplementedException();
		}

		public IReadOnlyCollection<Project> GetProjects()
		{
			return new Project[0];
		}
	}
}