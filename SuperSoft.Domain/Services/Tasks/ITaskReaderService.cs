using System.Collections.Generic;
using SuperSoft.Domain.Models;

namespace SuperSoft.Domain.Services.Tasks
{
	public interface ITaskReaderService
	{
		List<Task> GetTasksByChoosenLesson(int lessonId);
		Task GetTaskById(int taskId);
	}
}