using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;

namespace SuperSoft.Domain.Services.Trainings
{
	public interface ITrainingReaderService
	{
		IReadOnlyCollection<Task> GetTasks(TrainingTaskQuery query);
	}
}