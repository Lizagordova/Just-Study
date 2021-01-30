using SuperSoft.Domain.Models;
using SuperSoft.Domain.Services;
using SuperSoft.Persistence.Models.Dto;

namespace SuperSoft.Persistence.Services.MapperService
{
	public partial class MapperService : MapperServiceBase
	{
		private void CreateNotificationMappings()
		{
			AddMapping<Notification, NotificationUdt>(cfg =>
			{
				cfg.CreateMap<Notification, NotificationUdt>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
					.ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message));
			});

			AddMapping<NotificationUdt, Notification>(cfg =>
			{
				cfg.CreateMap<NotificationUdt, Notification>()
					.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
					.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
					.ForMember(dest => dest.Message, opt => opt.MapFrom(src => src.Message));
			});

			AddMapping<UserNotification, UserNotificationUdt>(cfg =>
			{
				cfg.CreateMap<UserNotification, UserNotificationUdt>()
					.ForMember(dest => dest.NotificationId, opt => opt.MapFrom(src => src.NotificationId))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.Seen, opt => opt.MapFrom(src => src.Seen));
			});

			AddMapping<UserNotificationUdt, UserNotification>(cfg =>
			{
				cfg.CreateMap<UserNotificationUdt, UserNotification>()
					.ForMember(dest => dest.NotificationId, opt => opt.MapFrom(src => src.NotificationId))
					.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
					.ForMember(dest => dest.Seen, opt => opt.MapFrom(src => src.Seen));
			});
		}
	}
}