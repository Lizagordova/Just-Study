using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateLogMappings()
		{
			AddMapping<Log, LogUdt>(cfg =>
			{
				cfg.CreateMap<Log, LogUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.LogLevel, opt => opt.MapFrom(src => src.LogLevel))
					.ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message))
					.ForMember(dest => dest.CustomMessage, opt => opt.MapFrom(src => src.CustomMessage));
			});

			AddMapping<LogUdt, Log>(cfg =>
			{
				cfg.CreateMap<LogUdt, Log>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.LogLevel, opt => opt.MapFrom(src => src.LogLevel))
					.ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message))
					.ForMember(dest => dest.CustomMessage, opt => opt.MapFrom(src => src.CustomMessage));
			});
		}
	}
}