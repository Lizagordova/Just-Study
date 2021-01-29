using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateUserTaskMappings()
		{
			AddMapping<UserTask, UserTaskViewModel>(cfg =>
			{
				cfg.CreateMap<UserTask, UserTaskViewModel>()
					.ForMember(dest => dest.UserSubtasks, opt => opt.MapFrom(src => src.UserSubtasks));
			});

			AddMapping<UserSubtaskReadModel, UserSubtask>(cfg =>
			{
				cfg.CreateMap<UserSubtaskReadModel, UserSubtask>()
					.ForMember(dest => dest.Answer, opt => opt.MapFrom(src => src.Answer))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
					.ForMember(dest => dest.AnswerPath, opt => opt.Ignore())
					.ForMember(dest => dest.UserSubtaskAnswerGroups, opt => opt.Ignore());
			});

			AddMapping<UserSubtask, UserSubtaskViewModel>(cfg =>
			{
				cfg.CreateMap<UserSubtask, UserSubtaskViewModel>()
					.ForMember(dest => dest.SubtaskId, opt => opt.Ignore())
					.ForMember(dest => dest.Answer, opt => opt.MapFrom(src => src.Answer))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
					.ForMember(dest => dest.AnswerFiles, opt => opt.MapFrom(src => src.AnswerPath))//TODO: ХУЙНЯ
					.ForMember(dest => dest.UserSubtaskAnswerGroups, opt => opt.MapFrom(src => src.UserSubtaskAnswerGroups));
			});

			AddMapping<UserSubtaskAnswerGroupReadModel, UserSubtaskAnswerGroup>(cfg =>
			{
				cfg.CreateMap<UserSubtaskAnswerGroupReadModel, UserSubtaskAnswerGroup>()
					.ForMember(dest => dest.AnswerGroupId, opt => opt.MapFrom(src => src.AnswerGroupId))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
					.ForMember(dest => dest.LastAnswer, opt => opt.MapFrom(src => src.LastAnswer));
			});

			AddMapping<UserSubtaskAnswerGroup, UserSubtaskAnswerGroupViewModel>(cfg =>
			{
				cfg.CreateMap<UserSubtaskAnswerGroup, UserSubtaskAnswerGroupViewModel>()
					.ForMember(dest => dest.AnswerGroupId, opt => opt.MapFrom(src => src.AnswerGroupId))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
					.ForMember(dest => dest.LastAnswer, opt => opt.MapFrom(src => src.LastAnswer));
			});
		}
	}
}