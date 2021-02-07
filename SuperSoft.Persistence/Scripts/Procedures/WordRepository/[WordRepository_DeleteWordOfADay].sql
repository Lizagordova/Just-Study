CREATE PROCEDURE [WordRepository_DeleteWordOfADay]
	@wordId INT
AS
BEGIN
	DELETE
	FROM [WordOfADay]
	WHERE [WordId] = @wordId;
END