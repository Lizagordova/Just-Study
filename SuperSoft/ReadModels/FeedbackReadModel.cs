﻿using System.ComponentModel.DataAnnotations;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
	[ApiReadModel]
	public class FeedbackReadModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		[EmailAddress]
		public string Email { get; set; }
		public string Message { get; set; }
		public bool Old { get; set; }
	}
}