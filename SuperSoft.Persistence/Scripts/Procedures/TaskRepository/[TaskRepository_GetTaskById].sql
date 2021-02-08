CREATE PROCEDURE [TaskRepository_GetTaskById]
	@taskId INT
AS
BEGIN
	DECLARE @task [UDT_Task];
	DECLARE @subtasks [UDT_Subtask];
	DECLARE @tags [UDT_Tag];
	DECLARE @taskTags [UDT_Task_Tag];

	INSERT
	INTO @task (
		[Id],
		[Instruction],
		[Text]
	)
	SELECT
		[Id],
		[Instruction],
		[Text]
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

	SELECT * FROM @task;
	SELECT * FROM @subtasks;
	SELECT * FROM @tags;
	SELECT * FROM @taskTags;
END