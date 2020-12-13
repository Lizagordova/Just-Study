using System;
using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services
{
	public class TaskReaderService : ITaskReaderService
	{
		private readonly ITaskRepository _taskRepository;

		public TaskReaderService(ITaskRepository taskRepository)
		{
			_taskRepository = taskRepository;
		}

		public IReadOnlyCollection<Task> GetTasks(int projectId)
		{
			throw new System.NotImplementedException();
		}

		public Tuple<IReadOnlyCollection<UserTask>, IReadOnlyCollection<ProjectTask>> GetUserTasks(int userId)
		{
			throw new NotImplementedException();
		}
	}
}