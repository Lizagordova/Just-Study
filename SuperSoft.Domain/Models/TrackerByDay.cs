namespace SuperSoft.Domain.Models
{
	public class TrackerByDay
	{
		public int Id { get; set; }
		public bool WebinarWatch { get; set; }
		public bool CompleteHomework { get; set; }
		public bool DictionaryOfLesson { get; set; }
		public bool WordOfADay { get; set; }
		public bool ChatParticipation { get; set; }
		public int Day { get; set; }

	}
}