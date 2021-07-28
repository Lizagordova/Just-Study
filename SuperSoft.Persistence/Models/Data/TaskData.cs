using System;
using System.Collections.Generic;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Models.Data
{
	public class TaskData
	{
		public List<TaskUdt> Tasks { get; set; }
		public List<SubtaskUdt> Subtasks { get; set; }
		public List<TagUdt> Tags { get; set; }
		public List<TaskTagUdt> TagTasks { get; set; }
		public List<SubtagUdt> Subtags { get; set; }
		public List<TaskSubtagUdt> TaskSubtags { get; set; }
	}
}