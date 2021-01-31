using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Repositories;

namespace SuperSoft.Persistence.Repositories
{
	public class TrainingRepository : ITrainingRepository
	{
		public IReadOnlyCollection<Task> GetTasks(TrainingTaskQuery query)
		{
			throw new System.NotImplementedException();
		}
	}
}