using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class UserSubtaskViewModel
	{
		public CompletingStatus Status { get; set; }
		public string Answer { get; set; }
		public int SubtaskId { get; set; }
		public IReadOnlyCollection<string> AnswerFiles { get; set; } = Array.Empty<string>();
		public IReadOnlyCollection<UserSubtaskAnswerGroupViewModel> UserSubtaskAnswerGroups { get; set; } = Array.Empty<UserSubtaskAnswerGroupViewModel>();
	}
}