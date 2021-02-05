namespace SuperSoft.Persistence.Models.Dto
{
	public class WordUdt
	{
		public int Id { get; set; }
		public string Word { get; set; }
		public string EnglishMeaning { get; set; }
		public string RussianMeaning { get; set; }
		public int PartOfSpeech { get; set; }
	}
}