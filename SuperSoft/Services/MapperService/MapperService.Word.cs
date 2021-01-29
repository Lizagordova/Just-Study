using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateWordMappings()
		{
			AddMapping<WordReadModel, Word>(cfg =>
			{
				cfg.CreateMap<WordReadModel, Word>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.EnglishMeaning, opt => opt.MapFrom(src => src.EnglishMeaning))
					.ForMember(dest => dest.RussianMeaning, opt => opt.MapFrom(src => src.RussianMeaning))
					.ForMember(dest => dest.WordText, opt => opt.MapFrom(src => src.Word))
					.ForMember(dest => dest.PartOfSpeech, opt => opt.MapFrom(src => src.PartOfSpeech))
					.ForMember(dest => dest.Examples, opt => opt.MapFrom(src => src.Examples));
			});

			AddMapping<Word, WordViewModel>(cfg =>
			{
				cfg.CreateMap<Word, WordViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.EnglishMeaning, opt => opt.MapFrom(src => src.EnglishMeaning))
					.ForMember(dest => dest.RussianMeaning, opt => opt.MapFrom(src => src.RussianMeaning))
					.ForMember(dest => dest.Word, opt => opt.MapFrom(src => src.WordText))
					.ForMember(dest => dest.PartOfSpeech, opt => opt.MapFrom(src => src.PartOfSpeech))
					.ForMember(dest => dest.Examples, opt => opt.MapFrom(src => src.Examples));
			});

			AddMapping<ExampleReadModel, Example>(cfg =>
			{
				cfg.CreateMap<ExampleReadModel, Example>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.ExampleText, opt => opt.MapFrom(src => src.Example));
			});

			AddMapping<Example, ExampleViewModel>(cfg =>
			{
				cfg.CreateMap<Example, ExampleViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Example, opt => opt.MapFrom(src => src.ExampleText));
			});

			AddMapping<UserWordReadModel, UserWord>(cfg =>
			{
				cfg.CreateMap<UserWordReadModel, UserWord>()
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.WordId, opt => opt.MapFrom(src => src.Word.Id))
					.ForMember(dest => dest.Answer, opt => opt.MapFrom(src => src.Answer))
					.ForMember(dest => dest.CountOfAttempts, opt => opt.MapFrom(src => src.CountOfAttempts))
					.ForMember(dest => dest.RightAnswers, opt => opt.MapFrom(src => src.RightAnswers))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));
			});

			AddMapping<UserWord, UserWordViewModel>(cfg =>
			{
				cfg.CreateMap<UserWord, UserWordViewModel>()
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.WordId, opt => opt.MapFrom(src => src.WordId))
					.ForMember(dest => dest.Answer, opt => opt.MapFrom(src => src.Answer))
					.ForMember(dest => dest.CountOfAttempts, opt => opt.MapFrom(src => src.CountOfAttempts))
					.ForMember(dest => dest.RightAnswers, opt => opt.MapFrom(src => src.RightAnswers))
					.ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));
			});
		}
	}
}