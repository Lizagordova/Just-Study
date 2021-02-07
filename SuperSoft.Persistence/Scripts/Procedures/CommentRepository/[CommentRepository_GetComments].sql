CREATE PROCEDURE [CommentRepository_GetComments]
	@groupId INT
AS
BEGIN
	DECLARE @comments [UDT_Comment];

	INSERT
	INTO @comments (
		[Id],
		[UserId],
		[Text],
		[PublishDate],
		[GroupId]
	)
	SELECT
		[Id],
		[UserId],
		[Text],
		[PublishDate],
		[GroupId]
	FROM [Comment]
	WHERE [GroupId] = @groupId;
	
	SELECT * FROM @comments;
END