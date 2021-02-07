CREATE PROCEDURE [NotificationRepository_AddOrUpdateNotification]
	@notification [UDT_Notification] READONLY
AS
BEGIN
	DECLARE @mergedIds TABLE([Id] INT);

	MERGE
	INTO [Notification] AS [dest]
	USING @notification AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN NOT MATCHED THEN
		INSERT (
			[CreatedBy],
			[Message],
			[Date]
		)
		VALUES (
			[src].[CreatedBy],
			[src].[Message],
			[src].[Date]
		)
	WHEN MATCHED THEN 
		UPDATE
		SET
			[dest].[CreatedBy] = [src].[CreatedBy],
			[dest].[Message] = [src].[Message],
			[dest].[Date] = [src].[Date]
	OUTPUT INSERTED.ID INTO @mergedIds;

	DECLARE @notificationId INT = (SELECT TOP 1 [Id] FROM @mergedIds);

	SELECT @notificationId;
END