namespace SuperSoft.Persistence.Models.Dto
{
	public class TrackerByDayUdt
	{
		public int Id { get; set; }
		public int TrackerId { get; set; }
		public bool WebinarWatch { get; set; }
		public bool CompletedHomework { get; set; }
		public bool WordOfADay { get; set; }
		public bool DictionaryOfLesson { get; set; }
		public bool ChatParticipation { get; set; }
		public int Day { get; set; }
	}
}