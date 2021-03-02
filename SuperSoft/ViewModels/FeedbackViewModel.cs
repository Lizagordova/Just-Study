using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class FeedbackViewModel
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string Message { get; set; }
	}
}