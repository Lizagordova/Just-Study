CREATE PROCEDURE [WordRepository_DeleteWordFromUserDictionary]
	@wordId INT,
	@userId INT
AS
BEGIN
	DELETE
	FROM [User_Word]
	WHERE [WordId] = @wordId
		AND [UserId] = @userId;
END