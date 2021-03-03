using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateFeedbackMappings()
		{
			AddMapping<Feedback, FeedbackUdt>(cfg =>
			{
				cfg.CreateMap<Feedback, FeedbackUdt>()
					.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message))
					.ForMember(dest => dest.Old, opt => opt.MapFrom(src => src.Old))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});

			AddMapping<FeedbackUdt, Feedback>(cfg =>
			{
				cfg.CreateMap<FeedbackUdt, Feedback>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Old, opt => opt.MapFrom(src => src.Old))
					.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
					.ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});
		}
	}
}