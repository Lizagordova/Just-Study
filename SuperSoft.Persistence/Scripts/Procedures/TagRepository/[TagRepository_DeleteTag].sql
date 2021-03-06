CREATE PROCEDURE [TagRepository_DeleteTag]
	@tagId INT
AS
BEGIN
	DELETE
	FROM [Tag]
	WHERE [Id] = @tagId;
END