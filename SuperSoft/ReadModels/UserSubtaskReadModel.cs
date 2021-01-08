using Microsoft.AspNetCore.Http;
using SuperSoft.Configuration.Typings.Attributes;
using SuperSoft.Domain.enums;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class UserSubtaskReadModel
	{
		public int UserId { get; set; }
		public int SubtaskId { get; set; }
		public CompletingStatus Status { get; set; }
		public string Answer { get; set; }
		public IFormFile File { get; set; }
	}
}