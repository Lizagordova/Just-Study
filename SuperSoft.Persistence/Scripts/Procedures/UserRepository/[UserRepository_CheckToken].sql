CREATE PROCEDURE [UserRepository_CheckToken]
	@token NVARCHAR(MAX)
AS
BEGIN
	DECLARE @userId INT = (
		SELECT TOP 1 [Id]
		FROM [User]
		WHERE [Token] = @token
	);
	DECLARE @exists BIT;

	IF @userId IS NOT NULL
		SET @exists = 1;
	ELSE
		SET @exists = 0;

	SELECT @exists;
END