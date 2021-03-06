﻿using System;
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
		public SubtaskReadModel[] Subtasks { get; set; }
		public IReadOnlyCollection<int> TagIds { get; set; }
		public IReadOnlyCollection<int> SubtagIds { get; set; }
		public bool DeleteOnlyFromLesson { get; set; }
	}
}