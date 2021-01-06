using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class TrackerByDayViewModel
	{
		public int Id { get; set; }
		public bool VebinarWatch { get; set; }
		public bool CompletedHomework { get; set; }
		public bool DictionaryOfLesson { get; set; }
		public bool WordOfADay { get; set; }
		public bool ChatParticipation { get; set; }
		public int Day { get; set; }
	}
}