CREATE TABLE [Task_Subtag]
(
	[TaskId] INT REFERENCES [Tag]([Id]) ON DELETE CASCADE,
	[SubtagId] INT REFERENCES [Subtag]([Id]) ON DELETE CASCADE,
	CONSTRAINT [UQ_Task_Subtag] UNIQUE([TaskId], [SubtagId])
);

CREATE TYPE [UDT_Task_Subtag] AS TABLE
(
	[TaskId] INT,
	[SubtagId] INT
);

CREATE PROCEDURE [TaskRepository_GetTaskById]
	@taskId INT
AS
BEGIN
	DECLARE @task [UDT_Task];
	DECLARE @subtasks [UDT_Subtask];
	DECLARE @tags [UDT_Tag];
	DECLARE @taskTags [UDT_Task_Tag];
	DECLARE @subtags [UDT_Subtag];
	DECLARE @taskSubtags [UDT_Task_Subtag];

	INSERT
	INTO @task (
		[Id],
		[Instruction],
		[Text],
		[TaskType]
	)
	SELECT
		[Id],
		[Instruction],
		[Text],
		[TaskType]
	FROM [Task]
	WHERE [Id] = @taskId;

	INSERT
	INTO @subtasks (
		[Id],
		[TaskId],
		[Text],
		[Path],
		[Order],
		[SubtaskType]
	)
	SELECT
		[Id],
		[TaskId],
		[Text],
		[Path],
		[Order],
		[SubtaskType]
	FROM [Subtask]
	WHERE [TaskId] = @taskId;

	INSERT
	INTO @taskTags (
		[TaskId],
		[TagId]
	)
	SELECT
		[TaskId],
		[TagId]
	FROM [Task_Tag]
	WHERE [TaskId] = @taskId;

	INSERT
	INTO @taskSubtags (
		[TaskId],
		[SubtagId]
	)
	SELECT
		[TaskId],
		[SubtagId]
	FROM [Task_Subtag]
	WHERE [TaskId] = @taskId;

	INSERT
	INTO @tags (
		[Id],
		[Name]
	)
	SELECT
		[Id],
		[Name]
	FROM [Tag]
	WHERE [Id] IN (
		SELECT [TagId]
		FROM @taskTags
	);

	INSERT
	INTO @subtags (
		[Id],
		[Name]
	)
	SELECT
		[Id],
		[Name]
	FROM [Subtag]
	WHERE [Id] IN (
		SELECT [SubtagId]
		FROM @taskSubtags
	);

	SELECT * FROM @task;
	SELECT * FROM @subtasks;
	SELECT * FROM @tags;
	SELECT * FROM @taskTags;
	SELECT * FROM @subtags;
	SELECT * FROM @taskSubtags;
END

CREATE PROCEDURE [TaskRepository_AttachSubtagsToTask]
	@taskId INT,
	@subtagIds [UDT_Integer] READONLY
AS
BEGIN
	MERGE
	INTO [Task_Subtag] AS [dest]
	USING @subtagIds AS [src]
	ON [dest].[SubtagId] = [src].[Id]
		AND [dest].[TaskId] = @taskId
	WHEN NOT MATCHED THEN
		INSERT (
			[TaskId],
			[SubtagId]
		) VALUES (
			@taskId,
			[src].[Id]
		);
END