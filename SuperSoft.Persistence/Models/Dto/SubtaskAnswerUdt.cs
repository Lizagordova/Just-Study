namespace SuperSoft.Persistence.Models.Dto
{
	public class SubtaskAnswerUdt
	{
		public int Id { get; set; }
		public int AnswerGroupId { get; set; }
		public string Answer { get; set; }
		public bool IsRight { get; set; }
		public bool IsInfinitive { get; set; }
		public string Explanation { get; set; }
	}
}