CREATE TYPE [UDT_Feedback] AS TABLE
(
	[Id] INT,
	[Name] NVARCHAR(50),
	[Email] NVARCHAR(100),
	[Message] NVARCHAR(MAX),
	[Old] BIT
);