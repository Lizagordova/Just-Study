CREATE TYPE [UDT_User] AS TABLE (
	[Id] INT,
	[Login] NVARCHAR(100),
	[FirstName] NVARCHAR(100),
	[LastName] NVARCHAR(100),
	[PasswordHash] NVARCHAR(MAX),
	[Role] NVARCHAR(50),
	[Token] NVARCHAR(MAX),
	[Email] NVARCHAR(MAX)
);