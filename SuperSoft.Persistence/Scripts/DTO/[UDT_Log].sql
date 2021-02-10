CREATE TYPE [UDT_Log] AS TABLE
(
	[Id] INT,
	[Message] NVARCHAR(MAX),
	[LogLevel] NVARCHAR(20),
	[CustomMessage] NVARCHAR(MAX),
	[Date] DATETIME2,
	[UserId] INT
);