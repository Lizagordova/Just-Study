using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class UserWordReadModel
	{
		public int UserId { get; set; }
		public WordReadModel Word { get; set; } = new WordReadModel();
		public int CountOfAttempts { get; set; }
		public int RightAnswers { get; set; }
		public CompletingStatus Status { get; set; }
		public string Answer { get; set; }
	}
}