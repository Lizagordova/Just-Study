CREATE TYPE [UDT_Subtask] AS TABLE
(
	[Id] INT,
	[TaskId] INT,
	[Text] NVARCHAR(MAX),
	[Path] NVARCHAR(MAX),
	[Order] INT,
	[SubtaskType] INT
);