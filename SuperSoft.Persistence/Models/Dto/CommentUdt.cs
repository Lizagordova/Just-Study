using System;

namespace SuperSoft.Persistence.Models.Dto
{
	public class CommentUdt
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public string Text { get; set; }
		public DateTime PublishDate { get; set; }
		public int GroupId { get; set; }
	}
}