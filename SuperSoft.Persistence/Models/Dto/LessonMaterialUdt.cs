namespace SuperSoft.Persistence.Models.Dto
{
	public class LessonMaterialUdt
	{
		public int Id { get; set; }
		public int LessonId { get; set; }
		public string Path { get; set; }
		public string Url { get; set; }
	}
}