CREATE TYPE [UDT_Task] AS TABLE
(
	[Id] INT,
	[Instruction] NVARCHAR(MAX),
	[Text] NVARCHAR(MAX),
	[TaskType] INT
);