using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;

namespace SuperSoft.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateNotificationMappings()
		{
			AddMapping<UserNotificationReadModel, UserNotification>(cfg =>
			{
				cfg.CreateMap<UserNotificationReadModel, UserNotification>()
					.ForMember(dest => dest.NotificationId, opt => opt.MapFrom(src => src.NotificationId))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.Seen, opt => opt.MapFrom(src => src.Seen));
			});
		}
	}
}