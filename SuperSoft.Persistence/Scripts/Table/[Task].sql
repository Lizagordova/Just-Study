﻿CREATE TABLE [Task] 
(
	[Id] INT PRIMARY KEY IDENTITY,
	[Instruction] NVARCHAR(MAX),
	[Text] NVARCHAR(MAX),
	[TaskType] INT
);