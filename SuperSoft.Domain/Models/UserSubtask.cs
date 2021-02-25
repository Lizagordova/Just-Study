using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class UserSubtask
	{
		public int SubtaskId { get; set; }
		public CompletingStatus Status { get; set; }
		public string Answer { get; set; }
		public string AnswerPath { get; set; }
		public IReadOnlyCollection<UserSubtaskAnswerGroup> UserSubtaskAnswerGroups { get; set; } = Array.Empty<UserSubtaskAnswerGroup>();
		public IFormFile File { get; set; }
	}
}