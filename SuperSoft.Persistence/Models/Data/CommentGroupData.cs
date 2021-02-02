using System.Collections.Generic;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Models.Data
{
	public class CommentGroupData
	{
		public CommentGroupUdt CommentGroup { get; set; }
		public List<CommentUdt> Comments { get; set; }
	}
}