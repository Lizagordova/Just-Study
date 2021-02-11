using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateLessonMappings()
		{
			AddMapping<Lesson, LessonUdt>(cfg =>
			{
				cfg.CreateMap<Lesson, LessonUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});

			AddMapping<Lesson, LessonCourseUdt>(cfg =>
			{
				cfg.CreateMap<Lesson, LessonCourseUdt>()
					.ForMember(dest => dest.LessonId, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
					.ForMember(dest => dest.ExpireDate, opt => opt.MapFrom(src => src.ExpireDate))
					.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
					.ForMember(dest => dest.CourseId, opt => opt.Ignore());
			});

			AddMapping<LessonUdt, Lesson>(cfg =>
			{
				cfg.CreateMap<LessonUdt, Lesson>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
					.ForMember(dest => dest.Order, opt => opt.Ignore())
					.ForMember(dest => dest.StartDate, opt => opt.Ignore())
					.ForMember(dest => dest.ExpireDate, opt => opt.Ignore());
			});

			AddMapping<LessonCourseUdt, Lesson>(cfg =>
			{
				cfg.CreateMap<LessonCourseUdt, Lesson>()
					.ForMember(dest => dest.Id, opt => opt.Ignore())
					.ForMember(dest => dest.Description, opt => opt.Ignore())
					.ForMember(dest => dest.Name, opt => opt.Ignore())
					.ForMember(dest => dest.Order, opt => opt.Ignore())
					.ForMember(dest => dest.StartDate, opt => opt.Ignore())
					.ForMember(dest => dest.ExpireDate, opt => opt.Ignore());
			});

			AddMapping<LessonMaterial, LessonMaterialUdt>(cfg =>
			{
				cfg.CreateMap<LessonMaterial, LessonMaterialUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Path))
					.ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Url))
					.ForMember(dest => dest.LessonId, opt => opt.Ignore());
			});

			AddMapping<LessonMaterialUdt, LessonMaterial>(cfg =>
			{
				cfg.CreateMap<LessonMaterialUdt, LessonMaterial>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.Path))
					.ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Url));
			});
		}
	}
}