using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class TaskViewModel
	{
		public int Id { get; set; }
		public string Instruction { get; set; }
		public string Text { get; set; }
		public IReadOnlyCollection<SubtaskViewModel> Subtasks { get; set; } = Array.Empty<SubtaskViewModel>();
		public IReadOnlyCollection<TagViewModel> Tags { get; set; } = Array.Empty<TagViewModel>();
	}
}