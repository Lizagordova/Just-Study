using System;
using System.Collections.Generic;
using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class Subtask
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public string Path { get; set; }
		public int Order { get; set; }
		public SubtaskType SubtaskType { get; set; }
		public IReadOnlyCollection<SubtaskAnswerGroup> AnswerGroups = Array.Empty<SubtaskAnswerGroup>();
	}
}