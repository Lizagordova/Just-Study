CREATE PROCEDURE [NotificationRepository_AddOrUpdateUserNotification]
	@userNotification [UDT_User_Notification] READONLY
AS
BEGIN
	MERGE
	INTO [User_Notification] AS [dest]
	USING @userNotification AS [src]
	ON [dest].[UserId] = [dest].[UserId]
		AND [dest].[NotificationId] = [src].[NotificationId]
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[Seen] = [src].[Seen]
	WHEN NOT MATCHED THEN
		INSERT (
			[UserId],
			[NotificationId],
			[Seen]
		) VALUES (
			[src].[UserId],
			[src].[NotificationId],
			[src].[Seen]
		);
END