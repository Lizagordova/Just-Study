using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateCourseMappings()
		{
			AddMapping<CourseReadModel, Course>(cfg =>
			{
				cfg.CreateMap<CourseReadModel, Course>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));
			});

			AddMapping<Course, CourseViewModel>(cfg =>
			{
				cfg.CreateMap<Course, CourseViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));
			});

			AddMapping<UserCourseReadModel, Course>(cfg =>
			{
				cfg.CreateMap<CourseReadModel, Course>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));
			});

			AddMapping<Course, CourseViewModel>(cfg =>
			{
				cfg.CreateMap<Course, CourseViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));
			});
		}
	}
}