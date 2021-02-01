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
	}
}