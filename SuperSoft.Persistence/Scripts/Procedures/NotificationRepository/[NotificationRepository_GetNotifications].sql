CREATE PROCEDURE [dbo].[NotificationRepository_GetNotifications]
	@userId INT
AS
BEGIN
	DECLARE @notifications [UDT_Notification];
	DECLARE @notificationIdsForUser [UDT_Integer];

	INSERT
	INTO @notificationIdsForUser (
		[Id]
	)
	SELECT
		[NotificationId]
	FROM [User_Notification]
	WHERE [UserId] = @userId
		AND [Seen] = 0 OR [Seen] IS NULL;

	INSERT
	INTO @notifications (
		[Id],
		[CreatedBy],
		[Message],
		[Date]
	)
	SELECT
		[Id],
		[CreatedBy],
		[Message],
		[Date]
	FROM [Notification]
	WHERE [Id] IN (
		SELECT [Id] 
		FROM @notificationIdsForUser
	);

	SELECT * FROM @notifications;

END