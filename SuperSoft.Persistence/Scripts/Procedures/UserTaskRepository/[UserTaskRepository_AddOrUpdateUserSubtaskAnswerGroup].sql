CREATE PROCEDURE [UserTaskRepository_AddOrUpdateUserSubtaskAnswerGroup]
	@answerGroup [UDT_UserSubtaskAnswerGroup] READONLY
AS
BEGIN
	MERGE
	INTO [User_SubtaskAnswerGroup] AS [dest]
	USING @answerGroup AS [src]
	ON [dest].[UserId] = [src].[UserId]
		AND [dest].[AnswerGroupId] = [src].[AnswerGroupId]
	WHEN MATCHED THEN
		UPDATE
		SET 
			[dest].[Status] = [src].[Status],
			[dest].[LastAnswer] = [src].[LastAnswer]
	WHEN NOT MATCHED THEN
		INSERT (
			[UserId],
			[AnswerGroupId],
			[Status],
			[LastAnswer]
		) VALUES (
			[src].[UserId],
			[src].[AnswerGroupId],
			[src].[Status],
			[src].[LastAnswer]
		);
END