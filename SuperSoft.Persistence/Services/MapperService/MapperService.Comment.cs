using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateCommentMappings()
		{
			AddMapping<CommentGroup, CommentGroupUdt>(cfg =>
			{
				cfg.CreateMap<CommentGroup, CommentGroupUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(dest => dest.Id))
					.ForMember(dest => dest.TaskId, opt => opt.MapFrom(dest => dest.TaskId));
			});

			AddMapping<CommentGroupUdt, CommentGroup>(cfg =>
			{
				cfg.CreateMap<CommentGroupUdt, CommentGroup>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(dest => dest.Id))
					.ForMember(dest => dest.TaskId, opt => opt.MapFrom(dest => dest.TaskId))
					.ForMember(dest => dest.Comments, opt => opt.Ignore());
			});

			AddMapping<Comment, CommentUdt>(cfg =>
			{
				cfg.CreateMap<Comment, CommentUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(dest => dest.Id))
					.ForMember(dest => dest.GroupId, opt => opt.Ignore())
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(dest => dest.User.Id))
					.ForMember(dest => dest.Comment, opt => opt.MapFrom(dest => dest.Text));
			});

			AddMapping<CommentUdt, Comment>(cfg =>
			{
				cfg.CreateMap<CommentUdt, Comment>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(dest => dest.Id))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(dest => dest.Comment))
					.ForMember(dest => dest.User, opt => opt.Ignore());
			});
		}
	}
}