namespace SuperSoft.Persistence.Models.Dto
{
	public class UserSubtaskUdt
	{
		public int UserId { get; set; }
		public int SubtaskId { get; set; }
		public string Answer { get; set; }
		public string AnswerPath { get; set; }
		public int Status { get; set; }
	}
}