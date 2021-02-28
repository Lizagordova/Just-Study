using System.Collections.Generic;
using System.Linq;
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
			var tasks = _trainingRepository.GetTasks(query);//todo: очень плохо, особенно если заданий будет очень много
			var finalTasks = new List<Task>();
			if (query.TagIds.Count > 0)
			{
				finalTasks.AddRange(tasks.Where(task => task.Tags.Any(tag => query.TagIds.Contains(tag.Id))));
			}
			else
			{
				finalTasks = tasks.Take(15).ToList();
			}

			return finalTasks;
		}
	}
}