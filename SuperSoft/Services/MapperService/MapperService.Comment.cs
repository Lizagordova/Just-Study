namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateCommentMappings()
		{
			AddMapping<CommentGroup, CommentGroupViewModel>(cfg =>
			{
				cfg.CreateMap<CommentGroup, CommentGroupViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.CommentedEntityId, opt => opt.MapFrom(src => src.CommentedEntityId))
					.ForMember(dest => dest.CommentedEntityType, opt => opt.MapFrom(src => src.CommentedEntityType));
			});
		}
	}
}