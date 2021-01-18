using System.Collections.Generic;
using System.Threading.Tasks;
using SuperSoft.Domain.Queries;

namespace SuperSoft.Domain.Services
{
	public interface ITrainingReaderService
	{
		IReadOnlyCollection<Task> GetTasks(TrainingTaskQuery query);
	}
}