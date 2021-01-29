using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class TrackerByDayReadModel
	{
		public int Id { get; set; }
		public bool WebinarWatch { get; set; }
		public bool CompletedHomework { get; set; }
		public bool DictionaryOfLesson { get; set; }
		public bool WordOfADay { get; set; }
		public bool ChatParticipation { get; set; }
		public int Day { get; set; }
	}
}