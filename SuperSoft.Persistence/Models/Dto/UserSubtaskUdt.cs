using SuperSoft.Domain.enums;

namespace SuperSoft.Persistence.Models.Dto
{
	public class UserSubtaskUdt
	{
		public CompletingStatus Status { get; set; }
		public string Answer { get; set; }
		public string AnswerPath { get; set; }
	}
}