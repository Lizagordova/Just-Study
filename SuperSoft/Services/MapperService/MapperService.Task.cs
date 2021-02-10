using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateTaskMappings()
		{
			AddMapping<TaskReadModel, Task>(cfg =>
			{
				cfg.CreateMap<TaskReadModel, Task>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Instruction, opt => opt.MapFrom(src => src.Instruction))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
					.ForMember(dest => dest.TaskType, opt => opt.MapFrom(src => src.TaskType))
					.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
					.ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags))
					.ForMember(dest => dest.Subtasks, opt => opt.MapFrom(src => src.Subtasks));
			});
			
			AddMapping<Task, TaskViewModel>(cfg =>
			{
				cfg.CreateMap<Task, TaskViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Instruction, opt => opt.MapFrom(src => src.Instruction))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
					.ForMember(dest => dest.TaskType, opt => opt.MapFrom(src => src.TaskType))
					.ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags))
					.ForMember(dest => dest.Subtasks, opt => opt.MapFrom(src => src.Subtasks));
			});

			AddMapping<SubtaskReadModel, Subtask>(cfg =>
			{
				cfg.CreateMap<SubtaskReadModel, Subtask>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
					.ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Path))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
					.ForMember(dest => dest.SubtaskType, opt => opt.MapFrom(src => src.SubtaskType))
					.ForMember(dest => dest.File,opt => opt.MapFrom(src => src.File))
					.ForMember(dest => dest.AnswerGroups, opt => opt.Ignore());
			});

			AddMapping<Subtask, SubtaskViewModel>(cfg =>
			{
				cfg.CreateMap<Subtask, SubtaskViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
					.ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Path))
					.ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
					.ForMember(dest => dest.SubtaskType, opt => opt.MapFrom(src => src.SubtaskType))
					.ForMember(dest => dest.AnswerGroups, opt => opt.MapFrom(src => src.AnswerGroups));
			});

			AddMapping<SubtaskAnswerGroup, SubtaskAnswerGroupViewModel>(cfg =>
			{
				cfg.CreateMap<SubtaskAnswerGroup, SubtaskAnswerGroupViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Answers, opt => opt.MapFrom(src => src.Answers));
			});

			AddMapping<SubtaskAnswer, SubtaskAnswerViewModel>(cfg =>
			{
				cfg.CreateMap<SubtaskAnswer, SubtaskAnswerViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Answer, opt => opt.MapFrom(src => src.Answer))
					.ForMember(dest => dest.Explanation, opt => opt.MapFrom(src => src.Explanation))
					.ForMember(dest => dest.IsRight, opt => opt.MapFrom(src => src.IsRight))
					.ForMember(dest => dest.IsInfinitive, opt => opt.MapFrom(src => src.IsInfinitive));
			});
		}
	}
}