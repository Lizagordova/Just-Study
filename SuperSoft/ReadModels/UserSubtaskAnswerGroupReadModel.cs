using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class UserSubtaskAnswerGroupReadModel
	{
		public int UserId { get; set; }
		public int AnswerGroupId { get; set; }
		public int Status { get; set; }
		public string LastAnswer { get; set; }
	}
}