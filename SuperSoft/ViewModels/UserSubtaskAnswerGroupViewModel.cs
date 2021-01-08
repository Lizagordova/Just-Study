using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class UserSubtaskAnswerGroupViewModel
	{
		public int AnswerGroupId { get; set; }
		public CompletingStatus Status { get; set; }
		public string LastAnswer { get; set; }
	}
}