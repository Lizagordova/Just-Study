CREATE PROCEDURE [UserTaskRepository_AddOrUpdateUserSubtask]
	@userSubtask [UDT_User_Subtask] READONLY
AS
BEGIN
	MERGE
	INTO [User_Subtask] AS [dest]
	USING @userSubtask AS [src]
	ON [dest].[UserId] = [src].[UserId]
		AND [dest].[SubtaskId] = [src].[SubtaskId]
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[Answer] = [src].[Answer],
			[dest].[AnswerPath] = [src].[AnswerPath],
			[dest].[Status] = [src].[Status]
	WHEN NOT MATCHED THEN
		INSERT (
			[UserId],
			[SubtaskId],
			[Answer],
			[AnswerPath],
			[Status]
		) VALUES (
			[src].[UserId],
			[src].[SubtaskId],
			[src].[Answer],
			[src].[AnswerPath],
			[src].[Status]
		);
END