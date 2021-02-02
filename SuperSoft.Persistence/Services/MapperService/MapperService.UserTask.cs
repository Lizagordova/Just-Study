using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateUserTaskMappings()
		{
			AddMapping<UserSubtask, UserSubtaskUdt>(cfg =>
			{
				cfg.CreateMap<UserSubtask, UserSubtaskUdt>()
					.ForMember(dest => dest.Answer, opt => opt.MapFrom(src => src.Answer))
					.ForMember(dest => dest.SubtaskId, opt => opt.Ignore())
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
					.ForMember(dest => dest.AnswerPath, opt => opt.MapFrom(src => src.AnswerPath));
			});

			AddMapping<UserSubtaskUdt, UserSubtask>(cfg =>
			{
				cfg.CreateMap<UserSubtaskUdt, UserSubtask>()
					.ForMember(dest => dest.Answer, opt => opt.MapFrom(src => src.Answer))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
					.ForMember(dest => dest.AnswerPath, opt => opt.MapFrom(src => src.AnswerPath))
					.ForMember(dest => dest.UserSubtaskAnswerGroups, opt => opt.Ignore());
			});

			AddMapping<UserSubtaskAnswerGroup, UserSubtaskAnswerGroupUdt>(cfg =>
			{
				cfg.CreateMap<UserSubtaskAnswerGroup, UserSubtaskAnswerGroupUdt>()
					.ForMember(dest => dest.LastAnswer, opt => opt.MapFrom(src => src.LastAnswer))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
					.ForMember(dest => dest.AnswerGroupId, opt => opt.MapFrom(src => src.AnswerGroupId))
					.ForMember(dest => dest.UserId, opt => opt.Ignore());
			});

			AddMapping<UserSubtaskAnswerGroupUdt, UserSubtaskAnswerGroup>(cfg =>
			{
				cfg.CreateMap<UserSubtaskAnswerGroupUdt, UserSubtaskAnswerGroup>()
					.ForMember(dest => dest.LastAnswer, opt => opt.MapFrom(src => src.LastAnswer))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
					.ForMember(dest => dest.AnswerGroupId, opt => opt.MapFrom(src => src.AnswerGroupId));
			});
		}
	}
}