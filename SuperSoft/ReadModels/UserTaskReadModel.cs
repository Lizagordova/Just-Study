using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class UserTaskReadModel
	{
		public int UserId { get; set; }
		public int TaskId { get; set; }
	}
}