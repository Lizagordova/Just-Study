using System;
using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class CommentReadModel
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public string Text { get; set; }
		public DateTime PublishDate { get; set; }
	}
}