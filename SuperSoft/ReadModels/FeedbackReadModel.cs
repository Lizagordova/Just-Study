using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class FeedbackReadModel
	{
		public string Name { get; set; }
		public string Email { get; set; }
		public string Message { get; set; }
	}
}