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
		public IReadOnlyCollection<Subtask> Subtasks { get; set; } = Array.Empty<Subtask>();
		public IReadOnlyCollection<Tag> Tags { get; set; } = Array.Empty<Tag>();
	}
}