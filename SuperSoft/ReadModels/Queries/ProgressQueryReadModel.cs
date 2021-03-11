using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels.Queries
{
	[ApiReadModel]
	public class ProgressQueryReadModel
	{
		public int UserId { get; set; }
		public int LessonId { get; set; }
		public int CourseId { get; set; }
	}
}