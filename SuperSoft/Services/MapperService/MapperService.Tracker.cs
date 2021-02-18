using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateTrackerMappings()
		{
			AddMapping<TrackerReadModel, Tracker>(cfg =>
			{
				cfg.CreateMap<TrackerReadModel, Tracker>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.TrackersByDay, opt => opt.MapFrom(src => src.TrackersByDay));
			});

			AddMapping<Tracker, TrackerViewModel>(cfg =>
			{
				cfg.CreateMap<Tracker, TrackerViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.TrackersByDay, opt => opt.MapFrom(src => src.TrackersByDay));
			});

			AddMapping<TrackerByDay, TrackerByDayViewModel>(cfg =>
			{
				cfg.CreateMap<TrackerByDay, TrackerByDayViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Day, opt => opt.MapFrom(src => src.Day))
					.ForMember(dest => dest.ChatParticipation, opt => opt.MapFrom(src => src.ChatParticipation))
					.ForMember(dest => dest.CompletedHomework, opt => opt.MapFrom(src => src.CompletedHomework))
					.ForMember(dest => dest.WebinarWatch, opt => opt.MapFrom(src => src.WebinarWatch))
					.ForMember(dest => dest.DictionaryOfLesson, opt => opt.MapFrom(src => src.DictionaryOfLesson))
					.ForMember(dest => dest.WordOfADay, opt => opt.MapFrom(src => src.WordOfADay));
			});

			AddMapping<TrackerByDayReadModel, TrackerByDay>(cfg =>
			{
				cfg.CreateMap<TrackerByDayReadModel, TrackerByDay>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Day, opt => opt.MapFrom(src => src.Day))
					.ForMember(dest => dest.ChatParticipation, opt => opt.MapFrom(src => src.ChatParticipation))
					.ForMember(dest => dest.CompletedHomework, opt => opt.MapFrom(src => src.CompletedHomework))
					.ForMember(dest => dest.WebinarWatch, opt => opt.MapFrom(src => src.WebinarWatch))
					.ForMember(dest => dest.DictionaryOfLesson, opt => opt.MapFrom(src => src.DictionaryOfLesson))
					.ForMember(dest => dest.WordOfADay, opt => opt.MapFrom(src => src.WordOfADay));
			});

		}
	}
}