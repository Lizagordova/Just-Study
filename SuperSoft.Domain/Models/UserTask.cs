using System;
using System.Collections.Generic;

namespace SuperSoft.Domain.Models
{
	public class UserTask
	{
		public IReadOnlyCollection<UserSubtask> UserSubtasks { get; set; } = Array.Empty<UserSubtask>();
	}
}