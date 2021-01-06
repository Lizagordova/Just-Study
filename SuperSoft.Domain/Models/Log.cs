namespace SuperSoft.Domain.Models
{
	public class Log
	{
		public int Id { get; set; }
		public string Message { get; set; }
		public string LogLevel { get; set; }
		public string CustomMessage { get; set; }
	}
}