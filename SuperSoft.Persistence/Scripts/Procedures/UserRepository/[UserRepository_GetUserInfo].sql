CREATE PROCEDURE [UserRepository_GetUserInfo]
	@userId INT
AS
BEGIN
	DECLARE @user [UDT_User];

	INSERT
	INTO @user (
		[Id],
		[Login],
		[FirstName],
		[LastName],
		[Role],
		[Token],
		[Email]
	)
	SELECT
		[Id],
		[Login],
		[FirstName],
		[LastName],
		[Role],
		[Token],
		[Email]
	FROM [User]
	WHERE [Id] = @userId;

	SELECT * FROM @user;
END