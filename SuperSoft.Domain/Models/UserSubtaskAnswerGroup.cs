using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class UserSubtaskAnswerGroup
	{
		public int AnswerGroupId { get; set; }
		public CompletingStatus Status { get; set; }
		public string LastAnswer { get; set; }
	}
}