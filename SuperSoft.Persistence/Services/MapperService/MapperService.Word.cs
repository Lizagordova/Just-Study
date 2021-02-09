using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateWordMappings()
		{
			AddMapping<Word, WordUdt>(cfg =>
			{
				cfg.CreateMap<Word, WordUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Word, opt => opt.MapFrom(src => src.WordText))
					.ForMember(dest => dest.RussianMeaning, opt => opt.MapFrom(src => src.RussianMeaning))
					.ForMember(dest => dest.EnglishMeaning, opt => opt.MapFrom(src => src.EnglishMeaning))
					.ForMember(dest => dest.PartOfSpeech, opt => opt.MapFrom(src => src.PartOfSpeech));
			});

			AddMapping<WordUdt, Word>(cfg =>
			{
				cfg.CreateMap<WordUdt, Word>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.WordText, opt => opt.MapFrom(src => src.Word))
					.ForMember(dest => dest.RussianMeaning, opt => opt.MapFrom(src => src.RussianMeaning))
					.ForMember(dest => dest.EnglishMeaning, opt => opt.MapFrom(src => src.EnglishMeaning))
					.ForMember(dest => dest.PartOfSpeech, opt => opt.MapFrom(src => src.PartOfSpeech))
					.ForMember(dest => dest.Examples, opt => opt.Ignore());
			});

			AddMapping<UserWord, UserWordUdt>(cfg =>
			{
				cfg.CreateMap<UserWord, UserWordUdt>()
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.WordId, opt => opt.MapFrom(src => src.WordId))
					.ForMember(dest => dest.Answer, opt => opt.MapFrom(src => src.Answer))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
					.ForMember(dest => dest.CountOfAttempts, opt => opt.MapFrom(src => src.CountOfAttempts))
					.ForMember(dest => dest.RightAnswers, opt => opt.MapFrom(src => src.RightAnswers));
			});

			AddMapping<UserWordUdt, UserWord>(cfg =>
			{
				cfg.CreateMap<UserWordUdt, UserWord>()
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.WordId, opt => opt.MapFrom(src => src.WordId))
					.ForMember(dest => dest.Answer, opt => opt.MapFrom(src => src.Answer))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
					.ForMember(dest => dest.CountOfAttempts, opt => opt.MapFrom(src => src.CountOfAttempts))
					.ForMember(dest => dest.RightAnswers, opt => opt.MapFrom(src => src.RightAnswers));
			});

			AddMapping<Example, ExampleUdt>(cfg =>
			{
				cfg.CreateMap<Example, ExampleUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.WordId, opt => opt.Ignore())
					.ForMember(dest => dest.Example, opt => opt.MapFrom(src => src.ExampleText));
			});

			AddMapping<ExampleUdt, Example>(cfg =>
			{
				cfg.CreateMap<ExampleUdt, Example>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.ExampleText, opt => opt.MapFrom(src => src.Example));
			});
		}
	}
}