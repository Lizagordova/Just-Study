﻿CREATE TABLE [Log] (
	[Id] INT PRIMARY KEY IDENTITY,
	[Message] NVARCHAR(MAX),
	[LogLevel] NVARCHAR(20),
	[CustomMessage] NVARCHAR(MAX),
	[Date] DATETIME2,
	[UserId] INT
);