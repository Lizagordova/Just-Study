using System;
using System.Collections.Generic;

namespace SuperSoft.Domain.Models
{
	public class CommentGroup
	{
		public int Id { get; set; }
		public int TaskId { get; set; }
		public IReadOnlyCollection<Comment> Comments = Array.Empty<Comment>();
	}
}