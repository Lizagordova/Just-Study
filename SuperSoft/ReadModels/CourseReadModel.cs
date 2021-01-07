using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class CourseReadModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
	}
}