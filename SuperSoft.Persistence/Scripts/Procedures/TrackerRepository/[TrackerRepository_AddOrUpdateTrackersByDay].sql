CREATE PROCEDURE [TrackerRepository_AddOrUpdateTrackersByDay]
	@trackersByDay [UDT_TrackerByDay] READONLY,
	@trackerId INT
AS
BEGIN
	DECLARE @mergedIds TABLE ([Id] INT);

	MERGE
	INTO [TrackerByDay] AS [dest]
	USING @trackersByDay AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[WebinarWatch] = [src].[WebinarWatch],
			[dest].[CompletedHomework] = [src].[CompletedHomework],
			[dest].[WordOfADay] = [src].[WordOfADay],
			[dest].[DictionaryOfLesson] = [src].[DictionaryOfLesson],
			[dest].[ChatParticipation] = [src].[ChatParticipation],
			[dest].[Day] = [src].[Day]
	WHEN NOT MATCHED THEN
		INSERT (
			[WebinarWatch],
			[CompletedHomework],
			[WordOfADay],
			[DictionaryOfLesson],
			[ChatParticipation],
			[Day]
		) VALUES (
			[src].[WebinarWatch],
			[src].[CompletedHomework],
			[src].[WordOfADay],
			[src].[DictionaryOfLesson],
			[src].[ChatParticipation],
			[src].[Day]
		)
	OUTPUT INSERTED.ID INTO @mergedIds;

	MERGE
	INTO [TrackerWhole] AS [dest]
	USING @mergedIds AS [src]
	ON [dest].[TrackerId] = [src].[Id]
	WHEN NOT MATCHED THEN
		INSERT (
			[TrackerId], 
			[TrackerByDayId]
		) VALUES (
			@trackerId, 
			[src].[Id]
		);

END