CREATE PROCEDURE [WordRepository_GetUserDictionary]
	@userId INT
AS
BEGIN
	DECLARE @userWords [UDT_User_Word];

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
	WHERE [UserId] = @userId;

	SELECT * FROM @userWords;
END