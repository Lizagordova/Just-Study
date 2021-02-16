using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class SubtaskViewModel
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public string Path { get; set; }
		public int Order { get; set; }
		public SubtaskType SubtaskType { get; set; }
		public IReadOnlyCollection<SubtaskAnswerGroupViewModel> AnswerGroups { get; set; } = Array.Empty<SubtaskAnswerGroupViewModel>();
	}
}