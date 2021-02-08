using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateTaskMappings()
		{
			AddMapping<Task, TaskUdt>(cfg =>
			{
				cfg.CreateMap<Task, TaskUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Instruction, opt => opt.MapFrom(src => src.Instruction))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text));
			});

			AddMapping<TaskUdt, Task>(cfg =>
			{
				cfg.CreateMap<TaskUdt, Task>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Instruction, opt => opt.MapFrom(src => src.Instruction))
					.ForMember(dest => dest.Order, opt => opt.Ignore())
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text));
			});

			AddMapping<Subtask, SubtaskUdt>(cfg =>
			{
				cfg.CreateMap<Subtask, SubtaskUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
					.ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Path))
					.ForMember(dest => dest.SubtaskType, opt => opt.MapFrom(src => src.SubtaskType))
					.ForMember(dest => dest.TaskId, opt => opt.Ignore())
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text));
			});

			AddMapping<SubtaskUdt, Subtask>(cfg =>
			{
				cfg.CreateMap<SubtaskUdt, Subtask>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
					.ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Path))
					.ForMember(dest => dest.SubtaskType, opt => opt.MapFrom(src => src.SubtaskType))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text));
			});

			AddMapping<SubtaskAnswer, SubtaskAnswerUdt>(cfg =>
			{
				cfg.CreateMap<SubtaskAnswer, SubtaskAnswerUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Answer, opt => opt.MapFrom(src => src.Answer))
					.ForMember(dest => dest.Explanation, opt => opt.MapFrom(src => src.Explanation))
					.ForMember(dest => dest.IsInfinitive, opt => opt.MapFrom(src => src.IsInfinitive))
					.ForMember(dest => dest.IsRight, opt => opt.MapFrom(src => src.IsRight))
					.ForMember(dest => dest.AnswerGroupId, opt => opt.Ignore());
			});

			AddMapping<SubtaskAnswerUdt, SubtaskAnswer>(cfg =>
			{
				cfg.CreateMap<SubtaskAnswerUdt, SubtaskAnswer>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Answer, opt => opt.MapFrom(src => src.Answer))
					.ForMember(dest => dest.Explanation, opt => opt.MapFrom(src => src.Explanation))
					.ForMember(dest => dest.IsInfinitive, opt => opt.MapFrom(src => src.IsInfinitive))
					.ForMember(dest => dest.IsRight, opt => opt.MapFrom(src => src.IsRight));
			});

			AddMapping<SubtaskAnswerGroup, SubtaskAnswerGroupUdt>(cfg =>
			{
				cfg.CreateMap<SubtaskAnswerGroup, SubtaskAnswerGroupUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.SubtaskId, opt => opt.Ignore());
			});

			AddMapping<SubtaskAnswerGroupUdt, SubtaskAnswerGroup>(cfg =>
			{
				cfg.CreateMap<SubtaskAnswerGroupUdt, SubtaskAnswerGroup>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Answers, opt => opt.Ignore());
			});
		}
	}
}