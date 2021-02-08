CREATE TYPE [UDT_User_Subtask] AS TABLE (
	[UserId] INT,
	[SubtaskId] INT,
	[Answer] NVARCHAR(MAX),
	[AnswerPath] NVARCHAR(MAX),
	[Status] INT
);