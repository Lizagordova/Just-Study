CREATE PROCEDURE [UserTaskRepository_GetUserSubtask]
	@subtaskId INT,
	@userId INT
AS
BEGIN
	DECLARE @userSubtask [UDT_User_Subtask];
	DECLARE @userSubtaskAnswerGroup [UDT_UserSubtaskAnswerGroup];
	DECLARE @userAnswerGroupIds TABLE ([Id] INT);

	INSERT
	INTO @userSubtask (
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
	WHERE [UserId] = @userId
		AND [SubtaskId] = @subtaskId;

	INSERT
	INTO @userAnswerGroupIds (
		[Id]
	)
	SELECT
		[Id]
	FROM [SubtaskAnswerGroup]
	WHERE [SubtaskId] = @subtaskId;

	INSERT
	INTO @userSubtaskAnswerGroup (
		[UserId],
		[AnswerGroupId],
		[SubtaskId],
		[Status],
		[LastAnswer]
	)
	SELECT
		[UserId],
		[AnswerGroupId],
		[sag].[SubtaskId],
		[Status],
		[LastAnswer]
	FROM [User_SubtaskAnswerGroup] AS [uag]
	JOIN [SubtaskAnswerGroup] AS [sag]
	ON [uag].[AnswerGroupId] = [sag].[Id]
	WHERE [AnswerGroupId] IN (
		SELECT [Id] FROM @userAnswerGroupIds);

	SELECT * FROM @userSubtask;
	SELECT * FROM @userSubtaskAnswerGroup;
END