namespace SuperSoft.Persistence.Models
{
	public class CommentUdt
	{
		public int Id { get; set; }
		public int GroupId { get; set; }
		public string Comment { get; set; }
		public int UserId { get; set; }
	}
}