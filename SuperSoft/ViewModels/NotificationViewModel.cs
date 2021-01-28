using System;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class NotificationViewModel
	{
		public int Id { get; set; }
		public int CreatedBy { get; set; }
		public string Message { get; set; }
		public DateTime Date { get; set; }
	}
}