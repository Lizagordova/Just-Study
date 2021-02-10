using System.Collections.Generic;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services.Trainings;

namespace SuperSoft.Persistence.Services.Trainings
{
	public class TrainingReaderService : ITrainingReaderService
	{
		private readonly ITrainingRepository _trainingRepository;
		public TrainingReaderService(
			ITrainingRepository trainingRepository)
		{
			_trainingRepository = trainingRepository;
		}

		public IReadOnlyCollection<Task> GetTasks(TrainingTaskQuery query)
		{
			var tasks = _trainingRepository.GetTasks(query);

			return tasks;
		}
	}
}