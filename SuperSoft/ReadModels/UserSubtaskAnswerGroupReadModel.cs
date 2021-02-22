using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class UserSubtaskAnswerGroupReadModel
	{
		public int UserId { get; set; }
		public int AnswerGroupId { get; set; }
		public int SubtaskId { get; set; }
		public CompletingStatus Status { get; set; }
		public string LastAnswer { get; set; }
	}
}