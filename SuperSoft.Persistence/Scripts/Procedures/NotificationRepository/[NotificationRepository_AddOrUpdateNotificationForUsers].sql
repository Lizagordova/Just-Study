CREATE PROCEDURE [NotificationRepository_AddOrUpdateNotificationForUsers]
	@userForIds [UDT_Integer] READONLY,
	@notificationId INT
AS
BEGIN
	MERGE
	INTO [User_Notification] AS [dest]
	USING @userForIds AS [src]
	ON [dest].[UserId] = [src].[Id]
		AND [dest].[NotificationId] = @notificationId
	WHEN NOT MATCHED THEN
		INSERT (
			[NotificationId],
			[UserId]
		)
		VALUES (
			@notificationId,
			[src].[Id]
	);
END