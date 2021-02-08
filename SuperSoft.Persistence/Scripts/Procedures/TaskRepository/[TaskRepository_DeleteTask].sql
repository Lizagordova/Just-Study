CREATE PROCEDURE [TaskRepository_DeleteTask]
	@taskId INT
AS
BEGIN
	DELETE
	FROM [Task]
	WHERE [Id] = @taskId;
END