CREATE PROCEDURE [UserRepository_GetUsers]
	@userId INT
AS
BEGIN
	DECLARE @users [UDT_User];

	INSERT
	INTO @users (
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
	FROM [User];

	SELECT * FROM @users;
END