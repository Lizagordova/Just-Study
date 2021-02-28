CREATE PROCEDURE [TaskRepository_AttachTagsToTask]
	@taskId INT,
	@tagIds [UDT_Integer] READONLY
AS
BEGIN
	MERGE
	INTO [Task_Tag] AS [dest]
	USING @tagIds AS [src]
	ON [dest].[TagId] = [src].[Id]
		AND [dest].[TaskId] = @taskId
	WHEN NOT MATCHED THEN
		INSERT (
			[TaskId],
			[TagId]
		) VALUES (
			@taskId,
			[src].[Id]
		);
END