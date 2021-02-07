CREATE TYPE [UDT_Notification] AS TABLE
(
	[Id] INT,
	[CreatedBy] INT,
	[Message] NVARCHAR(MAX),
	[Date] DATETIME2
);