CREATE PROCEDURE [UserTaskRepository_GetUserSubtasks]
	@taskId INT,
	@userId INT
AS
BEGIN
	DECLARE @userSubtasks [UDT_User_Subtask];
	DECLARE @groups [UDT_SubtaskAnswerGroup];
	DECLARE @userSubtaskAnswerGroups [UDT_UserSubtaskAnswerGroup];
	DECLARE @subtaskIds TABLE([Id] INT);

	INSERT
	INTO @subtaskIds (
		[Id]
	)
	SELECT
		[Id]
	FROM [Subtask]
	WHERE [TaskId] = @taskId;

	/* */
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
	INTO @groups (
		[Id],
		[SubtaskId]
	)
	SELECT
		[Id],
		[SubtaskId]
	FROM [SubtaskAnswerGroup]
	WHERE [SubtaskId] IN (
		SELECT [Id]
		FROM @subtaskIds);

	INSERT
	INTO @userSubtaskAnswerGroups (
		[UserId],
		[AnswerGroupId],
		[Status],
		[LastAnswer]
	)
	SELECT
		[UserId],
		[AnswerGroupId],
		[Status],
		[LastAnswer]
	FROM [User_SubtaskAnswerGroup]
	WHERE [UserId] = @userId
		AND [AnswerGroupId] IN (SELECT
		[Id] FROM @groups);

	SELECT * FROM @userSubtasks;
	SELECT * FROM @groups;
	SELECT * FROM @userSubtaskAnswerGroups;
END

CREATE TABLE [User_SubtaskAnswerGroup]
(
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[AnswerGroupId] INT,
	[Status] INT,
	[LastAnswer] NVARCHAR(MAX)
);

CREATE TYPE [UDT_UserSubtaskAnswerGroup] AS TABLE
(
	[UserId] INT,
	[AnswerGroupId] INT,
	[Status] INT,
	[LastAnswer] NVARCHAR(MAX)
);

CREATE TYPE [UDT_SubtaskAnswerGroup] AS TABLE
(
	[Id] INT,
	[SubtaskId] INT
);