using System;
using System.Collections.Generic;
using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class CommentGroup
	{
		public int Id { get; set; }
		public CommentedEntityType CommentedEntityType { get; set; }
		public int CommentedEntityId { get; set; }
		public int UserId { get; set; }
		public IReadOnlyCollection<Comment> Comments { get; set; } = Array.Empty<Comment>();
	}
}