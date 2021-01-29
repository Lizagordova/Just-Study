using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateLessonMappings()
		{
			AddMapping<LessonReadModel, Lesson>(cfg =>
			{
				cfg.CreateMap<LessonReadModel, Lesson>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
					.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
					.ForMember(dest => dest.ExpireDate, opt => opt.MapFrom(src => src.ExpireDate))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate));
			});

			AddMapping<Lesson, LessonViewModel>(cfg =>
			{
				cfg.CreateMap<Lesson, LessonViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
					.ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
					.ForMember(dest => dest.ExpireDate, opt => opt.MapFrom(src => src.ExpireDate))
					.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate));
			});
		}
	}
}