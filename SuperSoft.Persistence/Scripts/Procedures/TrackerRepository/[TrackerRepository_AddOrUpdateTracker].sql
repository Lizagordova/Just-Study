CREATE PROCEDURE [TrackerRepository_AddOrUpdateTracker]
	@tracker [UDT_Tracker] READONLY
AS
BEGIN
	DECLARE @mergedIds TABLE ([Id] INT);

	MERGE
	INTO [Tracker] AS [dest]
	USING @tracker AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN NOT MATCHED THEN
		INSERT (
			[UserId],
			[CourseId]
		) VALUES (
			[src].[UserId],
			[src].[CourseId]
		)
	OUTPUT INSERTED.ID INTO @mergedIds;

	DECLARE @trackerId INT = (SELECT TOP 1 [Id] FROM @mergedIds);

	SELECT @trackerId;
END