using System;
using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class TaskViewModel
	{
		public int Id { get; set; }
		public string Header { get; set; }
		public string Description { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime DeadlineDate { get; set; }
		public TaskType TaskType { get; set; }
		public TaskStatus Status { get; set; }
		public TaskPriority Priority { get; set; }
	}
}