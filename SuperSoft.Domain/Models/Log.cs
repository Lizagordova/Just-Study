
using System;
using Microsoft.Extensions.Logging;

namespace SuperSoft.Domain.Models
{
	public class Log
	{
		public int Id { get; set; }
		public string Message { get; set; }
		public LogLevel LogLevel { get; set; }
		public string CustomMessage { get; set; }
		public DateTime Date { get; set; }
		public int UserId { get; set; }
	}
}