using Microsoft.AspNetCore.Http;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class LessonMaterialReadModel
	{
		public int Id { get; set; }
		public int LessonId { get; set; }
		public IFormFile File { get; set; }
	}
}