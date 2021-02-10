CREATE PROCEDURE [dbo].[UserRepository_GetUserInfo]
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
		AND  (@email IS NULL OR [Id] = @email)
		AND  (@login IS NULL OR [Id] = @login)
		AND  (@passwordHash IS NULL OR [Id] = @passwordHash)
		AND  (@token IS NULL OR [Id] = @token);

	SELECT * FROM @user;
END