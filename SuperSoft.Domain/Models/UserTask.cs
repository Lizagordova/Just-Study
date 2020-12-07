using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class UserTask
	{
		public User User { get; set; }
		public Task Task { get; set; }
		public TaskRole Role { get; set; }
	}
}