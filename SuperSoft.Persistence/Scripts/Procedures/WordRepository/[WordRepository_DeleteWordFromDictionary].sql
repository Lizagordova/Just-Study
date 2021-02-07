CREATE PROCEDURE [WordRepository_DeleteWordFromDictionary]
	@wordId INT
AS
BEGIN
	DELETE
	FROM [Word]
	WHERE [Id] = @wordId;
END