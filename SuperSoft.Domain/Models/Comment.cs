namespace SuperSoft.Domain.Models
{
	public class Comment
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public User User { get; set; }
	}
}