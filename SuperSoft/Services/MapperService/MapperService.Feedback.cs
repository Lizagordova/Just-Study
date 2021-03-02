using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateFeedbackMappings()
		{
			AddMapping<FeedbackReadModel, Feedback>(cfg =>
			{
				cfg.CreateMap<FeedbackReadModel, Feedback>()
					.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
					.ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});

			AddMapping<Feedback, FeedbackViewModel>(cfg =>
			{
				cfg.CreateMap<Feedback, FeedbackViewModel>()
					.ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
					.ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message))
					.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
			});
		}
	}
}