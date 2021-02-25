CREATE PROCEDURE [TaskRepository_AddOrUpdateAnswerGroup]
	@subtaskId INT,
	@subtaskAnswers [UDT_SubtaskAnswer] READONLY
AS
BEGIN
	INSERT
	INTO [SubtaskAnswerGroup] (
		[SubtaskId]
	) VALUES (
		@subtaskId
	)
	DECLARE @groupId INT = (SELECT @@IDENTITY);

	INSERT
	INTO [SubtaskAnswer] (
		[AnswerGroupId],
		[Answer],
		[IsRight],
		[IsInfinitive],
		[Explanation]
	)
	SELECT
		@groupId,
		[Answer],
		[IsRight],
		[IsInfinitive],
		[Explanation]
	FROM @subtaskAnswers;

	SELECT @groupId;
END