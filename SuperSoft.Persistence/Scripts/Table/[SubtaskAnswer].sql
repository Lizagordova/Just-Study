CREATE TABLE [SubtaskAnswer]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[AnswerGroupId] INT REFERENCES [SubtaskAnswerGroup]([Id]) ON DELETE CASCADE,
	[Answer] NVARCHAR(MAX),
	[IsRight] BIT,
	[IsInfinitive] BIT,
	[Explanation] NVARCHAR(MAX)
);