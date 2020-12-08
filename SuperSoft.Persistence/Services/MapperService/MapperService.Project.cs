using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models;

namespace SuperSoft.Persistence.Services.MapperService
{
public partial class MapperService : MapperServiceBase
	{
		private void CreateProjectMappings()
		{
			AddMapping<Project, ProjectUdt>(cfg =>
			{
				cfg.CreateMap<Project, ProjectUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(dest => dest.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(dest => dest.Name))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(dest => dest.Description))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(dest => dest.StartDate))
					.ForMember(dest => dest.DeadlineDate, opt => opt.MapFrom(dest => dest.DeadlineDate));
			});

			AddMapping<ProjectUdt, Project>(cfg =>
			{
				cfg.CreateMap<ProjectUdt, Project>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(dest => dest.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(dest => dest.Name))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(dest => dest.Description))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(dest => dest.StartDate))
					.ForMember(dest => dest.DeadlineDate, opt => opt.MapFrom(dest => dest.DeadlineDate));
			});

			AddMapping<ProjectUser, ProjectUserUdt>(cfg =>
			{
				cfg.CreateMap<ProjectUser, ProjectUserUdt>()
					.ForMember(dest => dest.ProjectId, opt => opt.MapFrom(dest => dest.Project.Id))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(dest => dest.User.Id))
					.ForMember(dest => dest.Role, opt => opt.MapFrom(dest => dest.Role));
			});

			AddMapping<ProjectUserUdt, ProjectUser>(cfg =>
			{
				cfg.CreateMap<ProjectUserUdt, ProjectUser>()
					.ForMember(dest => dest.Project, opt => opt.Ignore())//todo: лучше resolve using добавить
					.ForMember(dest => dest.User, opt => opt.Ignore())
					.ForMember(dest => dest.Role, opt => opt.MapFrom(dest => dest.Role));
			});

			AddMapping<ProjectTask, ProjectTaskUdt>(cfg =>
			{
				cfg.CreateMap<ProjectTask, ProjectTaskUdt>()
					.ForMember(dest => dest.ProjectId, opt => opt.MapFrom(dest => dest.Project.Id))
					.ForMember(dest => dest.TaskId, opt => opt.MapFrom(dest => dest.Task.Id));
			});

			AddMapping<ProjectTaskUdt, ProjectTask>(cfg =>
			{
				cfg.CreateMap<ProjectTaskUdt, ProjectTask>()
					.ForMember(dest => dest.Project, opt => opt.Ignore()) //todo: лучше resolve using добавить
					.ForMember(dest => dest.Task, opt => opt.Ignore());
			});
		}
	}
}