using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class UserTaskReadModel
	{
		public UserTaskReadModel User { get; set; }
		public TaskReadModel Task { get; set; }
		public TaskRole Role { get; set; }
	}
}