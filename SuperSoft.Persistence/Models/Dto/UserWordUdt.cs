using SuperSoft.Domain.enums;

namespace SuperSoft.Persistence.Models.Dto
{
	public class UserWordUdt
	{
		public int UserId { get; set; }
		public int WordId { get; set; }
		public int CountOfAttempts { get; set; }
		public int RightAnswers { get; set; }
		public int Status { get; set; }
		public string Answer { get; set; }
	}
}