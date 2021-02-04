CREATE PROCEDURE [UserRepository_AddOrUpdateUser]
	@user [UDT_User] READONLY
AS
BEGIN
	DECLARE @mergedIds TABLE ([Id] INT);

	MERGE
	INTO [User] AS [dest]
	USING @user AS [src]
	ON [dest].[Id] = [src].[Id]
	    OR [dest].[Email] = [src].[Email]
	WHEN NOT MATCHED THEN
		INSERT (
		[Login],
		[FirstName],
		[LastName],
		[PasswordHash],
		[Role],
		[Token],
		[Email]
		)
		VALUES (
			[src].[Login],
			[src].[FirstName],
			[src].[LastName],
			[src].[PasswordHash],
			[src].[Role],
			[src].[Token],
			[src].[Email]
		)
	WHEN MATCHED THEN
		UPDATE
		SET
		[dest].[Login] = [src].[Login],
		[dest].[FirstName] = [src].[FirstName],
		[dest].[LastName] = [src].[LastName],
		[dest].[PasswordHash] = [src].[PasswordHash],
		[dest].[Role] = [src].[Role],
		[dest].[Token] = [src].[Token],
		[dest].[Email] = [src].[Email]

	OUTPUT INSERTED.ID INTO @mergedIds;
	DECLARE @userId INT = (SELECT TOP 1 [Id] FROM @mergedIds);

	SELECT @userId;
END