CREATE PROCEDURE [dbo].[TrackerRepository_GetTracker]
	@userId INT,
	@courseId INT
AS
BEGIN
	DECLARE @tracker [UDT_Tracker];
	DECLARE @trackersByDayIds TABLE([Id] INT);
	DECLARE @trackersByDay [UDT_TrackerByDay];

	DECLARE @trackerId INT = (
		SELECT [Id]
		FROM [Tracker] 
		WHERE [UserId] = @userId 
			AND [CourseId] = @courseId
		);

	IF @trackerId IS NOT NULL
		INSERT
		INTO @tracker (
			[Id],
			[UserId],
			[CourseId]
		)
		SELECT 
			[Id],
			[UserId],
			[CourseId]
		FROM [Tracker]
		WHERE [Id] = @trackerId;

		INSERT
		INTO @trackersByDayIds (
			[Id]
		)
		SELECT
			[TrackerByDayId]
		FROM [TrackerWhole]
		WHERE [TrackerId] = @trackerId;

		INSERT
		INTO @trackersByDay (
			[Id],
			[WebinarWatch],
			[CompletedHomework],
			[WordOfADay],
			[DictionaryOfLesson],
			[ChatParticipation],
			[Day]
		)
		SELECT
			[Id],
			[WebinarWatch],
			[CompletedHomework],
			[WordOfADay],
			[DictionaryOfLesson],
			[ChatParticipation],
			[Day]
		FROM [TrackerByDay]
		WHERE [Id] IN (
			SELECT [Id]
			FROM @trackersByDayIds
		);

	SELECT * FROM @tracker;
	SELECT * FROM @trackersByDay;
END