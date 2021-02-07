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
		}
	}
}