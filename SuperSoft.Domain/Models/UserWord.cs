using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class UserWord
	{
		public int UserId { get; set; }
		public int WordId { get; set; }
		public int CountOfAttempts { get; set; }
		public int RightAnswers { get; set; }
		public CompletingStatus Status { get; set; }
		public string Answer { get; set; }
	}
}