CREATE PROCEDURE [WordRepository_GetAnswersToWordOfADayByWord]
	@wordId INT,
	@courseId INT
AS
BEGIN
	DECLARE @userWords [UDT_User_Word];
	DECLARE @userIds TABLE([Id] INT);

	INSERT
	INTO @userIds (
		[Id]
	)
	SELECT
		[UserId]
	FROM [User_Course]
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
	WHERE [UserId] IN (
		SELECT [Id] 
		FROM @userIds);

	SELECT * FROM @userWords;
END