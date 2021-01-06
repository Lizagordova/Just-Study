using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class LessonMaterialViewModel
	{
		public int Id { get; set; }
		public string Path { get; set; }
		public string Url { get; set; }
	}
}