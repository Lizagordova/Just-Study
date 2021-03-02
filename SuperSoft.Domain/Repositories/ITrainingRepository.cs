using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;

namespace SuperSoft.Domain.Repositories
{
	public interface ITrainingRepository
	{
		List<Task> GetTasks(TrainingTaskQuery query);
	}
}