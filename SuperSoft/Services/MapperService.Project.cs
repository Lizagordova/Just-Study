using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateProjectMappings()
		{
			AddMapping<ProjectReadModel, Project>(cfg =>
			{
				cfg.CreateMap<ProjectReadModel, Project>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
					.ForMember(dest => dest.ResponsiblePerson, opt => opt.MapFrom(src => src.ResponsiblePerson))
					.ForMember(dest => dest.DeadlineDate, opt => opt.MapFrom(src => src.DeadlineDate));
			});

			AddMapping<Project, ProjectViewModel>(cfg =>
			{
				cfg.CreateMap<Project, ProjectViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
					.ForMember(dest => dest.ResponsiblePerson, opt => opt.MapFrom(src => src.ResponsiblePerson))
					.ForMember(dest => dest.DeadlineDate, opt => opt.MapFrom(src => src.DeadlineDate));
			});

			AddMapping<ProjectUserReadModel, ProjectUser>(cfg =>
			{
				cfg.CreateMap<ProjectUserReadModel, ProjectUser>()
					.ForMember(dest => dest.Project, opt => opt.Ignore())
					.ForMember(dest => dest.User, opt => opt.Ignore())
					.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role));
			});

			AddMapping<ProjectUser, ProjectUserViewModel>(cfg =>
			{
				cfg.CreateMap<ProjectUser, ProjectUserViewModel>()
					.ForMember(dest => dest.Project, opt => opt.Ignore())
					.ForMember(dest => dest.User, opt => opt.Ignore())
					.ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role));
			});
		}
	}
}