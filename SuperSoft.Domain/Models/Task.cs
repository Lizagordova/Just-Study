using System;
using System.Collections.Generic;
using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class Task
	{
		public int Id { get; set; }
		public string Instruction { get; set; }
		public string Text { get; set; }
		public int Order { get; set; }
		public TaskType TaskType { get; set; }
		public List<Subtask> Subtasks { get; set; }
		public List<Tag> Tags { get; set; }
		public List<Subtag> Subtags { get; set; }
	}
}