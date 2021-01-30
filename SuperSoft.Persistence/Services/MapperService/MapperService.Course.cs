using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateCourseMappings()
		{
			AddMapping<Course, CourseUdt>(cfg =>
			{
				cfg.CreateMap<Course, CourseUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});
			
			AddMapping<CourseUdt, Course>(cfg =>
			{
				cfg.CreateMap<CourseUdt, Course>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});

			AddMapping<UserCourse, UserCourseUdt>(cfg =>
			{
				cfg.CreateMap<UserCourse, UserCourseUdt>()
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.CourseId, opt => opt.MapFrom(src => src.CourseId))
					.ForMember(dest => dest.Tarif, opt => opt.MapFrom(src => src.Tarif))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
					.ForMember(dest => dest.ExpireDate, opt => opt.MapFrom(src => src.ExpireDate));
			});

			AddMapping<UserCourseUdt, UserCourse>(cfg =>
			{
				cfg.CreateMap<UserCourseUdt, UserCourse>()
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.CourseId, opt => opt.MapFrom(src => src.CourseId))
					.ForMember(dest => dest.Tarif, opt => opt.MapFrom(src => src.Tarif))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
					.ForMember(dest => dest.ExpireDate, opt => opt.MapFrom(src => src.ExpireDate));
			});
		}
	}
}