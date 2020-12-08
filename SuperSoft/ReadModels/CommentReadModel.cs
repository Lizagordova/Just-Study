using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class CommentReadModel
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public UserReadModel User { get; set; }
	}
}