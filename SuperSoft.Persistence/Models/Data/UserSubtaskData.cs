using System.Collections.Generic;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Models.Data
{
	public class UserSubtaskData
	{
		public List<UserSubtaskUdt> UserSubtasks { get; set; }
		public List<UserSubtaskAnswerGroupUdt> UserAnswerGroups { get; set; }
	}
}