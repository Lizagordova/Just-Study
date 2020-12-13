using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface IProjectReaderService
	{
		IReadOnlyCollection<User> GetProjectUsers(int projectId);
		IReadOnlyCollection<Project> GetProjects();
	}
}