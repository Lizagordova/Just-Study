using System;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class CommentViewModel
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public string Text { get; set; }
		public DateTime PublishDate { get; set; }
	}
}