using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ViewModels
{
	[ApiViewModel]
	public class CourseViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
	}
}