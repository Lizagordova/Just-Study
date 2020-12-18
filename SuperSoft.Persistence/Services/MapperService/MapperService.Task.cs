using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateTaskMappings()
		{
			AddMapping<Task, TaskUdt>(cfg =>
			{
				cfg.CreateMap<Task, TaskUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(dest => dest.Id))
					.ForMember(dest => dest.Header, opt => opt.MapFrom(dest => dest.Header))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(dest => dest.Status))
					.ForMember(dest => dest.TaskType, opt => opt.MapFrom(dest => dest.TaskType))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(dest => dest.Description))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(dest => dest.StartDate))
					.ForMember(dest => dest.Priority, opt => opt.MapFrom(dest => dest.Priority))
					.ForMember(dest => dest.DeadlineDate, opt => opt.MapFrom(dest => dest.DeadlineDate));
			});

			AddMapping<TaskUdt, Task>(cfg =>
			{
				cfg.CreateMap<TaskUdt, Task>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(dest => dest.Id))
					.ForMember(dest => dest.Header, opt => opt.MapFrom(dest => dest.Header))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(dest => dest.Status))
					.ForMember(dest => dest.TaskType, opt => opt.MapFrom(dest => dest.TaskType))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(dest => dest.Description))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(dest => dest.StartDate))
					.ForMember(dest => dest.Priority, opt => opt.MapFrom(dest => dest.Priority))
					.ForMember(dest => dest.DeadlineDate, opt => opt.MapFrom(dest => dest.DeadlineDate));
			});
		}
	}
}