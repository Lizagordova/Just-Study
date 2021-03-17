using System.Collections.Generic;
using System.Linq;
using SuperSoft.Domain.Models;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.ReadModels;
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

		public TrackerViewModel MapTrackerViewModel(Tracker tracker)
		{
			var trackerViewModel = _mapper.Map<Tracker, TrackerViewModel>(tracker);
			trackerViewModel.TrackersByDay = tracker.TrackersByDay.Select(_mapper.Map<TrackerByDay, TrackerByDayViewModel>).ToList();

			return trackerViewModel;
		}

		public Tracker MapTracker(TrackerReadModel trackerReadModel)
		{
			var tracker = _mapper.Map<TrackerReadModel, Tracker>(trackerReadModel);
			tracker.TrackersByDay = trackerReadModel.TrackersByDay.Select(_mapper.Map<TrackerByDayReadModel, TrackerByDay>).ToList();

			return tracker;
		}

		public CommentGroup MapCommentGroup(CommentGroupReadModel commentGroupReadModel)
		{
			var commentGroup = _mapper.Map<CommentGroupReadModel, CommentGroup>(commentGroupReadModel);
			commentGroup.Comments = new List<Comment>() { _mapper.Map<CommentReadModel, Comment>(commentGroupReadModel.Comment) };

			return commentGroup;
		}

		public CommentGroupViewModel MapCommentGroupViewModel(CommentGroup commentGroup)
		{
			var commentGroupViewModel = _mapper.Map<CommentGroup, CommentGroupViewModel>(commentGroup);
			commentGroupViewModel.Comments = commentGroup.Comments.Select(_mapper.Map<Comment, CommentViewModel>).ToList();

			return commentGroupViewModel;
		}

		public UserTaskViewModel MapUserTaskViewModel(UserTask userTask)
		{
			var userTaskViewModel = new UserTaskViewModel
			{
				UserSubtasks = userTask.UserSubtasks.Select(MapUserSubtaskViewModel).ToList()
			};
			return userTaskViewModel;
		}

		private UserSubtaskViewModel MapUserSubtaskViewModel(UserSubtask userSubtask)
		{
			var userSubtaskViewModel = _mapper.Map<UserSubtask, UserSubtaskViewModel>(userSubtask);
			var answers = new List<string>();
			if (userSubtask.AnswerPath != null)
			{
				answers.Add(userSubtask.AnswerPath);
			}

			userSubtaskViewModel.AnswerFiles = answers;
			userSubtaskViewModel.UserSubtaskAnswerGroups = userSubtask.UserSubtaskAnswerGroups.Select(_mapper.Map<UserSubtaskAnswerGroup, UserSubtaskAnswerGroupViewModel>).ToList();

			return userSubtaskViewModel;
		}
		
		public TagViewModel MapTagViewModel(Tag tag)
		{
			var tagViewModel = _mapper.Map<Tag, TagViewModel>(tag);
			tagViewModel.Subtags = tag.Subtags.Select(_mapper.Map<Subtag, SubtagViewModel>).ToList();

			return tagViewModel;
		}
	}
}