using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class TaskReadModel
	{
		public int Id { get; set; }
		public string Instruction { get; set; }
		public string Text { get; set; }
		public int LessonId { get; set; }
		public TaskType TaskType { get; set; }
		public IReadOnlyCollection<SubtaskReadModel> Subtasks { get; set; } = Array.Empty<SubtaskReadModel>();
		public IReadOnlyCollection<TagReadModel> Tags { get; set; } = Array.Empty<TagReadModel>();
	}
}