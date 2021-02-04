CREATE PROCEDURE [UserRepository_DeleteUser]
	@userId INT
AS
BEGIN
	DELETE
	FROM [User]
	WHERE [Id] = @userId;
END