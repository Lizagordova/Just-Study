using Microsoft.AspNetCore.Http;

namespace SuperSoft.ReadModels
{
	public class LessonMaterialReadModel
	{
		public int Id { get; set; }
		public int LessonId { get; set; }
		public IFormFile File { get; set; }
	}
}