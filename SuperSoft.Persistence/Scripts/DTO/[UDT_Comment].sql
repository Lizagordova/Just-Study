CREATE TYPE [UDT_Comment] AS TABLE
(
	[Id] INT,
	[UserId] INT,
	[Text] NVARCHAR(MAX),
	[PublishDate] DATETIME2,
	[GroupId] INT
);