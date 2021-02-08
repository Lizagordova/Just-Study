CREATE TYPE [UDT_SubtaskAnswer] AS TABLE
(
	[Id] INT,
	[AnswerGroupId] INT,
	[Answer] NVARCHAR(MAX),
	[IsRight] BIT,
	[IsInfinitive] BIT,
	[Explanation] NVARCHAR(MAX)
);