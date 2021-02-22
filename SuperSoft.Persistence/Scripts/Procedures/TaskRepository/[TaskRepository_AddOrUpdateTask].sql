CREATE PROCEDURE [TaskRepository_AddOrUpdateTask]
	@task [UDT_Task] READONLY
AS
BEGIN
	DECLARE @mergedIds TABLE ([Id] INT);

	MERGE
	INTO [Task] AS [dest]
	USING @task AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN NOT MATCHED THEN
		INSERT (
			[Text],
			[Instruction],
			[TaskType]
		) VALUES (
			[src].[Text],
			[src].[Instruction],
			[src].[TaskType]
		)
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[Text] = [src].[Text],
			[dest].[Instruction] = [src].[Instruction],
			[dest].[TaskType] = [src].[TaskType]
	OUTPUT INSERTED.ID INTO @mergedIds;

	DECLARE @taskId INT = (SELECT TOP 1 [Id] FROM @mergedIds);

	SELECT @taskId;

END