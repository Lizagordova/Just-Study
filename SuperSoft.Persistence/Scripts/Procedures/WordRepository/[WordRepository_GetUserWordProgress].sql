CREATE PROCEDURE [WordRepository_GetUserWordProgress]
	@userId INT,
	@wordId INT
AS
BEGIN
	DECLARE @userWord [UDT_User_Word];

	INSERT
	INTO @userWord (
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
		AND [WordId] = @wordId;

	SELECT * FROM @userWord;
END