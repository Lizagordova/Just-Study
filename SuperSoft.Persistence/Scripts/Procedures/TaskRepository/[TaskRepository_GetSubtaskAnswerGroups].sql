CREATE PROCEDURE [TaskRepository_GetSubtaskAnswerGroups]
	@subtaskId INT
AS
BEGIN
	DECLARE @answerGroups [UDT_SubtaskAnswerGroup];
	DECLARE @answers [UDT_SubtaskAnswer];

	INSERT
	INTO @answerGroups (
		[Id],
		[SubtaskId]
	)
	SELECT
		[Id],
		[SubtaskId]
	FROM [SubtaskAnswerGroup]
	WHERE [SubtaskId] = @subtaskId;

	INSERT
	INTO @answers (
		[Id],
		[AnswerGroupId],
		[Answer],
		[IsRight],
		[IsInfinitive],
		[Explanation]
	)
	SELECT
		[Id],
		[AnswerGroupId],
		[Answer],
		[IsRight],
		[IsInfinitive],
		[Explanation]
	FROM [SubtaskAnswer]
	WHERE [AnswerGroupId] IN (
		SELECT [Id]
		FROM @answerGroups
	);

	SELECT * FROM @answerGroups;
	SELECT * FROM @answers;
END