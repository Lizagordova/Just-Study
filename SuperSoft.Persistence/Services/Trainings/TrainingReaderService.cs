using System.Collections.Generic;
using System.Threading.Tasks;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Services;

namespace SuperSoft.Persistence.Services.Trainings
{
	public class TrainingReaderService : ITrainingReaderService
	{
		public IReadOnlyCollection<Task> GetTasks(TrainingTaskQuery query)
		{
			throw new System.NotImplementedException();
		}
	}
}