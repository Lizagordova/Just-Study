using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.Models;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class UserTaskViewModel
	{
		public IReadOnlyCollection<UserSubtaskViewModel> UserSubtasks { get; set; } = Array.Empty<UserSubtaskViewModel>();
	}
}