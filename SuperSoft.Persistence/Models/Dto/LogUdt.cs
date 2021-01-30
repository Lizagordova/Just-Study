using Microsoft.Extensions.Logging;

namespace SuperSoft.Persistence.Models.Dto
{
	public class LogUdt
	{
		public int Id { get; set; }
		public string Message { get; set; }
		public LogLevel LogLevel { get; set; }
		public string CustomMessage { get; set; }
	}
}