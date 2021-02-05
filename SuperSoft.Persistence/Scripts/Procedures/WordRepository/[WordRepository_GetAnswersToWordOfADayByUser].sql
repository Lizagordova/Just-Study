CREATE PROCEDURE [WordRepository_GetAnswersToWordOfADayByUser]
	@userId INT,
	@courseId INT
AS
BEGIN
	DECLARE @userWords [UDT_User_Word];
	DECLARE @wordOfADayIds TABLE([Id] INT);

	INSERT
	INTO @wordOfADayIds (
		[Id]
	)
	SELECT
		[WordId]
	FROM [WordOfADay]
	WHERE [CourseId] = @courseId;

	INSERT
	INTO @userWords (
		[UserId],
		[WordId],
		[CountOfAttempts],
		[RightAnswers],
		[Status],
		[Answer]
	)
	SELECT
		[UserId],
		[WordId],
		[CountOfAttempts],
		[RightAnswers],
		[Status],
		[Answer]
	FROM [User_Word]
	WHERE [UserId] = @userId
		AND [WordId] IN (
			SELECT [Id] 
			FROM @wordOfADayIds
	);

	SELECT * FROM @userWords;
END