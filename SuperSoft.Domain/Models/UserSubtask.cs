using System;
using System.Collections.Generic;
using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class UserSubtask
	{
		public CompletingStatus Status { get; set; }
		public string Answer { get; set; }
		public string AnswerPath { get; set; }
		public IReadOnlyCollection<UserSubtaskAnswerGroup> UserSubtaskAnswerGroups { get; set; } = Array.Empty<UserSubtaskAnswerGroup>();
	}
}