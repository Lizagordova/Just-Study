CREATE PROCEDURE [UserTaskRepository_DeleteUserSubtask]
	@subtaskId INT,
	@userId INT
AS
BEGIN
	DELETE
	FROM [User_Subtask]
	WHERE [SubtaskId] = @subtaskId
		AND [UserId] = @userId;
END