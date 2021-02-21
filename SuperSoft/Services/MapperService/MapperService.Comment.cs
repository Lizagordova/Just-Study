using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateCommentMappings()
		{
			AddMapping<CommentGroupReadModel, CommentGroup>(cfg =>
			{
				cfg.CreateMap<CommentGroupReadModel, CommentGroup>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.CommentedEntityId, opt => opt.MapFrom(src => src.CommentedEntityId))
					.ForMember(dest => dest.CommentedEntityType, opt => opt.MapFrom(src => src.CommentedEntityType))
					.ForMember(dest => dest.Comments, opt => opt.Ignore());
			});

			AddMapping<CommentGroup, CommentGroupViewModel>(cfg =>
			{
				cfg.CreateMap<CommentGroup, CommentGroupViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.CommentedEntityId, opt => opt.MapFrom(src => src.CommentedEntityId))
					.ForMember(dest => dest.CommentedEntityType, opt => opt.MapFrom(src => src.CommentedEntityType))
					.ForMember(dest => dest.Comments, opt => opt.Ignore());
			});

			AddMapping<CommentReadModel, Comment>(cfg =>
			{
				cfg.CreateMap<CommentReadModel, Comment>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
					.ForMember(dest => dest.PublishDate, opt => opt.MapFrom(src => src.PublishDate));
			});

			AddMapping<Comment, CommentViewModel>(cfg =>
			{
				cfg.CreateMap<Comment, CommentViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
					.ForMember(dest => dest.PublishDate, opt => opt.MapFrom(src => src.PublishDate));
			});
		}
	}
}