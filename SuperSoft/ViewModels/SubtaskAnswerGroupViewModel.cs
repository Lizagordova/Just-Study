using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class SubtaskAnswerGroupViewModel
	{
		public int Id { get; set; }
		public IReadOnlyCollection<SubtaskAnswerViewModel> Answers { get; set; } = Array.Empty<SubtaskAnswerViewModel>();
	}
}