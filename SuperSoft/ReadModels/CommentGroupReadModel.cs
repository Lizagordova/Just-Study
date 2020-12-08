using System;
using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class CommentGroupReadModel
	{
		public int Id { get; set; }
		public int TaskId { get; set; }
		public IReadOnlyCollection<CommentReadModel> Comments = Array.Empty<CommentReadModel>();
	}
}