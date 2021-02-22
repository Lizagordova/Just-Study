using SuperSoft.Domain.enums;

namespace SuperSoft.Persistence.Models.Dto
{
	public class UserSubtaskAnswerGroupUdt
	{
		public int UserId { get; set; }
		public int AnswerGroupId { get; set; }
		public int SubtaskId { get; set; }
		public int Status { get; set; }
		public string LastAnswer { get; set; }
	}
}