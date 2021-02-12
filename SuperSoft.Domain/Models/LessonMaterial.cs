using Microsoft.AspNetCore.Http;

namespace SuperSoft.Domain.Models
{
	public class LessonMaterial
	{
		public int Id { get; set; }
		public string Path { get; set; }
		public string Url { get; set; }
	}
}