using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class NotificationRepository : INotificationRepository
	{
		private readonly MapperService _mapper;
		private const string AddOrUpdateNotificationSp = "NotificationRepository_AddOrUpdateNotification";
		private const string AddOrUpdateUserNotificationSp = "NotificationRepository_AddOrUpdateUserNotification";
		private const string GetNotificationsSp = "NotificationRepository_GetNotifications";

		public NotificationRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public void AddOrUpdateNotification(List<int> userForIds, Notification notification)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateNotificationParam(userForIds, notification);
			conn.Query(AddOrUpdateNotificationSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public void AddOrUpdateUserNotification(UserNotification userNotification)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateUserNotificationParam(userNotification);
			conn.Query(AddOrUpdateUserNotificationSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public List<Notification> GetNotifications(int userId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetGetNotificationsParam(userId);
			var notificationUdts = conn.Query<NotificationUdt>(GetNotificationsSp, param, commandType: CommandType.StoredProcedure);
			var notifications = notificationUdts.Select(_mapper.Map<NotificationUdt, Notification>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return notifications;
		}

		private DynamicTvpParameters GetAddOrUpdateNotificationParam(List<int> userForIds, Notification notification)
		{
			var param = new DynamicTvpParameters();
			var userIdsTvp = new TableValuedParameter("userForIds", "UDT_Integer");
			var userIdsUdt = userForIds.Select(uId => new IntegerUdt() { Id = uId }).ToList();
			userIdsTvp.AddObjectAsRow(userIdsUdt);
			param.Add(userIdsTvp);
			
			var notificationTvp = new TableValuedParameter("notification", "UDT_Notification");
			var notificationUdt = _mapper.Map<Notification, NotificationUdt>(notification);
			notificationTvp.AddObjectAsRow(notificationUdt);
			param.Add(notificationTvp);

			return param;
		}

		private DynamicTvpParameters GetAddOrUpdateUserNotificationParam(UserNotification userNotification)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("userNotifciation", "UDT_UserNotification");
			var udt = _mapper.Map<UserNotification, UserNotificationUdt>(userNotification);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetGetNotificationsParam(int userId)
		{
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);

			return param;
		}
	}
}