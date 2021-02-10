CREATE PROCEDURE [UserRepository_GetUserInfo]
	@userId INT = NULL,
	@email NVARCHAR(MAX) = NULL,
	@login NVARCHAR(MAX) = NULL,
	@passwordHash NVARCHAR(MAX) = NULL,
	@token NVARCHAR(MAX) = Null
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
	WHERE (@userId IS NULL OR [Id] = @userId)
		AND  (@email IS NULL OR [Email] = @email)
		AND  (@login IS NULL OR [Login] = @login)
		AND  (@passwordHash IS NULL OR [PasswordHash] = @passwordHash)
		AND  (@token IS NULL OR [Token] = @token);

	SELECT * FROM @user;
END