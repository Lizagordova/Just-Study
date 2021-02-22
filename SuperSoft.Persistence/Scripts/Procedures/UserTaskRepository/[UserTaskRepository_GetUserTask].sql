CREATE PROCEDURE [UserTaskRepository_GetUserTask]
	@taskId INT,
	@userId INT
AS
BEGIN
	DECLARE @userSubtasks [UDT_User_Subtask];
	DECLARE @answerGroups [UDT_SubtaskAnswerGroup];
	DECLARE @userSubtaskAnswerGroups [UDT_UserSubtaskAnswerGroup];

	DECLARE @subtaskIds TABLE ([Id] INT);
	
	INSERT
	INTO @subtaskIds (
		[Id]
	)
	SELECT [Id]
	FROM [Subtask]
	WHERE [TaskId] = @taskId;

	INSERT
	INTO @userSubtasks (
		[UserId],
		[SubtaskId],
		[Answer],
		[AnswerPath],
		[Status]
	)
	SELECT
		[UserId],
		[SubtaskId],
		[Answer],
		[AnswerPath],
		[Status]
	FROM [User_Subtask]
	WHERE [SubtaskId] IN (
		SELECT [Id]
		FROM @subtaskIds
	);

	INSERT
	INTO @answerGroups (
		[Id],
		[SubtaskId]
	)
	SELECT
		[Id],
		[SubtaskId]
	FROM [SubtaskAnswerGroup]
	WHERE [SubtaskId] IN (
		SELECT [Id]
		FROM @subtaskIds
	);

	INSERT
	INTO @userSubtaskAnswerGroups (
		[UserId],
		[AnswerGroupId],
		[SubtaskId],
		[Status],
		[LastAnswer]
	)
	SELECT
		[UserId],
		[AnswerGroupId],
		[SubtaskId],
		[Status],
		[LastAnswer]
	FROM [User_SubtaskAnswerGroup] AS [uag]
	JOIN @answerGroups AS [ag]
	ON [uag].[AnswerGroupId] = [ag].[Id];

	SELECT * FROM @userSubtasks;
	SELECT * FROM @answerGroups;
	SELECT * FROM @userSubtaskAnswerGroups;
	SELECT * FROM @subtaskIds;
END