using SuperSoft.Domain.Services;

namespace SuperSoft.Services
{
	public partial class MapperService : MapperServiceBase
	{
		protected override void CreateMappings()
		{
			CreateCommentMappings();
			CreateProjectMappings();
			CreateTaskMappings();
			CreateUserMappings();
		}
	}
}