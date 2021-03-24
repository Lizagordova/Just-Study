CREATE PROCEDURE [TrainingRepository_GetTasks]
AS
BEGIN
	DECLARE @tasks [UDT_Task];
	DECLARE @subtasks [UDT_Subtask];
	DECLARE @tags [UDT_Tag];
	DECLARE @taskTags [UDT_Task_Tag];
	DECLARE @taskIds [UDT_Integer];
	DECLARE @subtags [UDT_Subtag];
	DECLARE @taskSubtags [UDT_Task_Subtag]; 

	INSERT
	INTO @tasks (
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
	FROM [Task];

	INSERT
	INTO @taskIds (
		[Id]
	)
	SELECT
		[Id]
	FROM @tasks;

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
	WHERE [TaskId] IN (
		SELECT [Id]
		FROM @taskIds
	);

	INSERT
	INTO @taskTags (
		[TaskId],
		[TagId]
	)
	SELECT
		[TaskId],
		[TagId]
	FROM [Task_Tag]
	WHERE [TaskId] IN (
		SELECT [Id]
		FROM @taskIds
	);

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
	INTO @taskSubtags (
		[TaskId],
		[SubtagId]
	)
	SELECT
		[TaskId],
		[SubtagId]
	FROM [Task_Subtag]
	WHERE [TaskId] IN (
		SELECT [Id]
		FROM @taskIds
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

	SELECT * FROM @tasks;
	SELECT * FROM @subtasks;
	SELECT * FROM @tags;
	SELECT * FROM @taskTags;
	SELECT * FROM @subtags;
	SELECT * FROM @taskSubtags;
END