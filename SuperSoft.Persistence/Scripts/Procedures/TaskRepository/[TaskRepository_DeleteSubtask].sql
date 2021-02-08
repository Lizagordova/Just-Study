CREATE PROCEDURE [TaskRepository_DeleteSubtask]
	@subtaskId INT
AS
BEGIN
	DELETE
	FROM [Subtask]
	WHERE [Id] = @subtaskId;
END