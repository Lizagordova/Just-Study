CREATE PROCEDURE [WordRepository_AddOrUpdateUserWord]
	@userWord [UDT_User_Word] READONLY
AS
BEGIN
	MERGE
	INTO [User_Word] AS [dest]
	USING @userWord AS [src]
	ON [dest].[WordId] = [src].[WordId]
		AND  [dest].[UserId] = [src].[UserId]
	WHEN NOT MATCHED THEN
		INSERT (
			[UserId],
			[WordId],
			[CountOfAttempts],
			[RightAnswers],
			[Status],
			[Answer]
		) VALUES (
			[src].[UserId],
			[src].[WordId],
			[src].[CountOfAttempts],
			[src].[RightAnswers],
			[src].[Status],
			[src].[Answer]
		)
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[UserId] = [src].[UserId],
			[dest].[WordId] = [src].[WordId],
			[dest].[CountOfAttempts] = [src].[CountOfAttempts],
			[dest].[RightAnswers] = [src].[RightAnswers],
			[dest].[Status] = [src].[Status],
			[dest].[Answer] = [src].[Answer];
END