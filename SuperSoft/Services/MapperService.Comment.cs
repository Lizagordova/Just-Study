using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateCommentMappings()
		{
			AddMapping<CommentReadModel, Comment>(cfg =>
			{
				cfg.CreateMap<CommentReadModel, Comment>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
					.ForMember(dest => dest.User, opt => opt.Ignore());
			});

			AddMapping<Comment, CommentViewModel>(cfg =>
			{
				cfg.CreateMap<Comment, CommentViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
					.ForMember(dest => dest.User, opt => opt.Ignore());
			});

			AddMapping<CommentGroupReadModel, CommentGroup>(cfg =>
			{
				cfg.CreateMap<CommentGroupReadModel, CommentGroup>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.TaskId, opt => opt.MapFrom(src => src.TaskId))
					.ForMember(dest => dest.Comments, opt => opt.Ignore());
			});

			AddMapping<CommentGroup, CommentGroupViewModel>(cfg =>
			{
				cfg.CreateMap<CommentGroup, CommentGroupViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.TaskId, opt => opt.MapFrom(src => src.TaskId))
					.ForMember(dest => dest.Comments, opt => opt.Ignore());
			});
		}
	}
}