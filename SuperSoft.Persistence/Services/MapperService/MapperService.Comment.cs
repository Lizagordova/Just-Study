using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateCommentMappings()
		{
			AddMapping<CommentGroup, CommentGroupUdt>(cfg =>
			{
				cfg.CreateMap<CommentGroup, CommentGroupUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.CommentedEntityId, opt => opt.MapFrom(src => src.CommentedEntityId))
					.ForMember(dest => dest.CommentedEntityType, opt => opt.MapFrom(src => src.CommentedEntityType));
			});

			AddMapping<CommentGroupUdt, CommentGroup>(cfg =>
			{
				cfg.CreateMap<CommentGroupUdt, CommentGroup>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.CommentedEntityId, opt => opt.MapFrom(src => src.CommentedEntityId))
					.ForMember(dest => dest.CommentedEntityType, opt => opt.MapFrom(src => src.CommentedEntityType))
					.ForMember(dest => dest.Comments, opt => opt.Ignore());
			});

			AddMapping<Comment, CommentUdt>(cfg =>
			{
				cfg.CreateMap<Comment, CommentUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
					.ForMember(dest => dest.GroupId, opt => opt.Ignore())
					.ForMember(dest => dest.PublishDate, opt => opt.MapFrom(src => src.PublishDate));
			});

			AddMapping<CommentUdt, Comment>(cfg =>
			{
				cfg.CreateMap<CommentUdt, Comment>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
					.ForMember(dest => dest.PublishDate, opt => opt.MapFrom(src => src.PublishDate));
			});
		}
	}
}