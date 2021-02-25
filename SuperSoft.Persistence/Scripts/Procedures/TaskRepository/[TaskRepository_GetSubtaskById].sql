CREATE PROCEDURE [TaskRepository_GetSubtaskById]
	@subtaskId INT
AS
BEGIN
	DECLARE @subtask [UDT_Subtask];

	INSERT
	INTO @subtask (
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
	WHERE [Id] = @subtaskId;

	SELECT * FROM @subtask;
END