﻿using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class CommentGroupViewModel
	{
		public int Id { get; set; }
		public CommentedEntityType CommentedEntityType { get; set; }
		public int CommentedEntityId { get; set; }
		public int UserId { get; set; }
		public IReadOnlyCollection<CommentViewModel> Comments { get; set; } = Array.Empty<CommentViewModel>();
	}
}