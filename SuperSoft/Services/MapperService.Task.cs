using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateTaskMappings()
		{
			AddMapping<TaskReadModel, Task>(cfg =>
			{
				cfg.CreateMap<TaskReadModel, Task>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Header, opt => opt.MapFrom(src => src.Header))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
					.ForMember(dest => dest.DeadlineDate, opt => opt.MapFrom(src => src.DeadlineDate))
					.ForMember(dest => dest.TaskType, opt => opt.MapFrom(src => src.TaskType))
					.ForMember(dest => dest.Priority, opt => opt.MapFrom(src => src.Priority))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));
			});

			AddMapping<Task, TaskViewModel>(cfg =>
			{
				cfg.CreateMap<Task, TaskViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Header, opt => opt.MapFrom(src => src.Header))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
					.ForMember(dest => dest.DeadlineDate, opt => opt.MapFrom(src => src.DeadlineDate))
					.ForMember(dest => dest.TaskType, opt => opt.MapFrom(src => src.TaskType))
					.ForMember(dest => dest.Priority, opt => opt.MapFrom(src => src.Priority))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));
			});

			AddMapping<ProjectTaskReadModel, ProjectTask>(cfg =>
			{
				cfg.CreateMap<ProjectTaskReadModel, ProjectTask>()
					.ForMember(dest => dest.Project, opt => opt.Ignore())
					.ForMember(dest => dest.Task, opt => opt.Ignore());
			});

			AddMapping<ProjectTask, ProjectTaskViewModel>(cfg =>
			{
				cfg.CreateMap<ProjectTask, ProjectTaskViewModel>()
					.ForMember(dest => dest.Project, opt => opt.Ignore())
					.ForMember(dest => dest.Task, opt => opt.Ignore());
			});
		}
	}
}