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

			AddMapping<UserCourseReadModel, UserCourse>(cfg =>
			{
				cfg.CreateMap<UserCourseReadModel, UserCourse>()
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.CourseId, opt => opt.MapFrom(src => src.CourseId))
					.ForMember(dest => dest.ExpireDate, opt => opt.MapFrom(src => src.ExpireDate))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
					.ForMember(dest => dest.Tarif, opt => opt.MapFrom(src => src.Tarif));
			});

			AddMapping<UserCourse, UserCourseViewModel>(cfg =>
			{
				cfg.CreateMap<UserCourse, UserCourseViewModel>()
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.CourseId, opt => opt.MapFrom(src => src.CourseId))
					.ForMember(dest => dest.ExpireDate, opt => opt.MapFrom(src => src.ExpireDate))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
					.ForMember(dest => dest.Tarif, opt => opt.MapFrom(src => src.Tarif));
			});
		}
	}
}