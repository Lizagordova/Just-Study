CREATE PROCEDURE [TagRepository_DeleteSubtag]
	@subtagId INT
AS
BEGIN
	DELETE
	FROM [Subtag]
	WHERE [Id] = @subtagId;
END