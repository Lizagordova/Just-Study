using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class CommentGroupViewModel
	{
		public int Id { get; set; }
		public int TaskId { get; set; }
		public IReadOnlyCollection<CommentViewModel> Comments = Array.Empty<CommentViewModel>();
	}
}