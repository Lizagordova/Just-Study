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
		public int Order { get; set; }//todo: сейчас никак не заполняется, надо чтобы заполнялось!!!
		public TaskType TaskType { get; set; }
		public List<SubtaskReadModel> Subtasks { get; set; } = new List<SubtaskReadModel>();
		public List<TagReadModel> Tags { get; set; } =new List<TagReadModel>();
	}
}