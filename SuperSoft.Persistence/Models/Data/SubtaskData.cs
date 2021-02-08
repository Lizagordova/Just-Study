using System.Collections.Generic;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Models.Data
{
	public class SubtaskData
	{
		public List<SubtaskAnswerGroupUdt> AnswerGroups { get; set; }
		public List<SubtaskAnswerUdt> Answers { get; set; }
	}
}