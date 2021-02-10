using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using SuperSoft.Domain.enums;

namespace SuperSoft.Domain.Models
{
	public class Subtask
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public string Path { get; set; }
		public int Order { get; set; }
		public SubtaskType SubtaskType { get; set; }
		public IReadOnlyCollection<SubtaskAnswerGroup> AnswerGroups = Array.Empty<SubtaskAnswerGroup>();
		public IFormFile File { get; set; }
	}
}