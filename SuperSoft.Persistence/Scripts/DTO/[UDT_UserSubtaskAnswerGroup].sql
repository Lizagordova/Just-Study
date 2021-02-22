CREATE TYPE [UDT_UserSubtaskAnswerGroup] AS TABLE
(
	[UserId] INT,
	[AnswerGroupId] INT,
	[SubtaskId] INT,
	[Status] INT,
	[LastAnswer] NVARCHAR(MAX)
);