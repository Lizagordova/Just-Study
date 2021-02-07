CREATE PROCEDURE [CommentRepository_RemoveComment]
	@commentId INT
AS
BEGIN
	DELETE
	FROM [Comment]
	WHERE [Id] = @commentId;
END