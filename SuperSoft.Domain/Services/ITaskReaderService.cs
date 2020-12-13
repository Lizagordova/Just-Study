using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services
{
	public interface ITaskReaderService
	{
		IReadOnlyCollection<Task> GetTasks(int projectId);
		Tuple<IReadOnlyCollection<UserTask>, IReadOnlyCollection<ProjectTask>> GetUserTasks(int userId);
	}
}