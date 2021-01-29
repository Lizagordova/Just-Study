using System;
using System.Collections.Generic;

namespace SuperSoft.Domain.Models
{
	public class SubtaskAnswerGroup
	{
		public int Id { get; set; }
		public IReadOnlyCollection<SubtaskAnswer> Answers { get; set; } = Array.Empty<SubtaskAnswer>();
	}
}