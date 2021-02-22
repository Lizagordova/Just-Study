using System.Collections.Generic;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Models.Data
{
	public class UserTaskData
	{
		public List<UserSubtaskUdt> UserSubtasks { get; set; }
		public List<UserSubtaskAnswerGroupUdt> UserSubtaskGroups { get; set; }
		public List<SubtaskAnswerGroupUdt> AnswerGroups { get; set; }
		public List<int> SubtaskIds { get; set; }
	}
}