CREATE PROCEDURE [TaskRepository_AddOrUpdateSubtask]
	@subtask [UDT_Subtask] READONLY
AS
BEGIN
	DECLARE @mergedIds TABLE([Id] INT);
	
	DECLARE @order INT= (SELECT TOP 1 [Order] FROM @subtask);
	DECLARE @taskId INT = (SELECT TOP 1 [TaskId] FROM @subtask);
	DECLARE @existSubtaskWithTheOrder INT = (SELECT TOP 1 [Id] 
		FROM [Subtask] 
		WHERE [Order] = @order
			AND [TaskId] = @taskId);
	DECLARE @id INT = (SELECT TOP 1 [Id] FROM @subtask);

	IF (@order IS NOT NULL AND @existSubtaskWithTheOrder IS NOT NULL AND @id = 0)
		OR (@id != 0 AND @order != (SELECT [Order] FROM [Subtask] WHERE [Id] = @id))
		UPDATE [Subtask]
		SET
			[Order] = [Order] + 1
		WHERE [Order] >= @order
			AND [TaskId] = @taskId;

	MERGE
	INTO [Subtask] AS [dest]
	USING @subtask AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN NOT MATCHED THEN
		INSERT (
			[TaskId],
			[Text],
			[Path],
			[Order],
			[SubtaskType]
		) VALUES (
			[src].[TaskId],
			[src].[Text],
			[src].[Path],
			[src].[Order],
			[src].[SubtaskType]
		)
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[TaskId] = [src].[TaskId],
			[dest].[Text] = [src].[Text],
			[dest].[Path] = [src].[Path],
			[dest].[Order] = [src].[Order],
			[dest].[SubtaskType] = [src].[SubtaskType]
	OUTPUT INSERTED.ID INTO @mergedIds;

	DECLARE @subtaskId INT = (SELECT TOP 1 [Id] FROM @mergedIds);

	SELECT @subtaskId;
END