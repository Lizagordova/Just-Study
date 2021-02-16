using System.Linq;
using SuperSoft.Domain.Models;
using SuperSoft.Services.MapperService;
using SuperSoft.ViewModels;

namespace SuperSoft.Helpers
{
	public class MapHelper
	{
		private readonly MapperService _mapper;

		public MapHelper(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public TaskViewModel MapTaskViewModel(Task task)
		{
			var taskViewModel = _mapper.Map<Task, TaskViewModel>(task);
			taskViewModel.Subtasks = task.Subtasks.Select(MapSubtaskViewModel).ToList();
			taskViewModel.Tags = task.Tags.Select(_mapper.Map<Tag, TagViewModel>).ToList();

			return taskViewModel;
		}

		private SubtaskViewModel MapSubtaskViewModel(Subtask subtask)
		{
			var subtaskViewModel = _mapper.Map<Subtask, SubtaskViewModel>(subtask);
			subtaskViewModel.AnswerGroups = subtask.AnswerGroups.Select(MapSubtaskAnswerGroupViewModel).ToList();

			return subtaskViewModel;
		}

		private SubtaskAnswerGroupViewModel MapSubtaskAnswerGroupViewModel(SubtaskAnswerGroup answerGroup)
		{
			var answerGroupViewModel = _mapper.Map<SubtaskAnswerGroup, SubtaskAnswerGroupViewModel>(answerGroup);
			answerGroupViewModel.Answers = answerGroup.Answers.Select(_mapper.Map<SubtaskAnswer, SubtaskAnswerViewModel>).ToList();

			return answerGroupViewModel;
		}
	}
}