using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateTrackerMappings()
		{
			AddMapping<Tracker, TrackerUdt>(cfg =>
			{
				cfg.CreateMap<Tracker, TrackerUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
			});

			AddMapping<TrackerUdt, Tracker>(cfg =>
			{
				cfg.CreateMap<TrackerUdt, Tracker>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.TrackersByDay, opt => opt.Ignore());
			});

			AddMapping<TrackerByDay, TrackerByDayUdt>(cfg =>
			{
				cfg.CreateMap<TrackerByDay, TrackerByDayUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Day, opt => opt.MapFrom(src => src.Day))
					.ForMember(dest => dest.ChatParticipation, opt => opt.MapFrom(src => src.ChatParticipation))
					.ForMember(dest => dest.CompletedHomework, opt => opt.MapFrom(src => src.CompleteHomework))
					.ForMember(dest => dest.WebinarWatch, opt => opt.MapFrom(src => src.WebinarWatch))
					.ForMember(dest => dest.DictionaryOfLesson, opt => opt.MapFrom(src => src.DictionaryOfLesson))
					.ForMember(dest => dest.WordOfADay, opt => opt.MapFrom(src => src.WordOfADay));
			});

			AddMapping<TrackerByDayUdt, TrackerByDay>(cfg =>
			{
				cfg.CreateMap<TrackerByDayUdt, TrackerByDay>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Day, opt => opt.MapFrom(src => src.Day))
					.ForMember(dest => dest.ChatParticipation, opt => opt.MapFrom(src => src.ChatParticipation))
					.ForMember(dest => dest.CompleteHomework, opt => opt.MapFrom(src => src.CompletedHomework))
					.ForMember(dest => dest.WebinarWatch, opt => opt.MapFrom(src => src.WebinarWatch))
					.ForMember(dest => dest.DictionaryOfLesson, opt => opt.MapFrom(src => src.DictionaryOfLesson))
					.ForMember(dest => dest.WordOfADay, opt => opt.MapFrom(src => src.WordOfADay));
			});
		}
	}
}