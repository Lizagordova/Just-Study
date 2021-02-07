CREATE PROCEDURE [CommentRepository_GetCommentGroup]
	@group [UDT_CommentGroup] READONLY
AS
BEGIN
	DECLARE @groupId INT = (
		SELECT TOP 1 [Id]
		FROM [CommentGroup]
		WHERE [CommentedEntityId] = (SELECT [CommentedEntityId] FROM @group)
			AND [CommentedEntityType] = (SELECT [CommentedEntityType] FROM @group)
			AND [UserId] = (SELECT [UserId] FROM @group)
		);

	SELECT @groupId;
END