using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.ViewModels;

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

			AddMapping<Notification, NotificationViewModel>(cfg =>
			{
				cfg.CreateMap<Notification, NotificationViewModel>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
					.ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy));
			});
		}
	}
}