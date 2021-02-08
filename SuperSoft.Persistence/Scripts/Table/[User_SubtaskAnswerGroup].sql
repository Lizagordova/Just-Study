CREATE TABLE [User_SubtaskAnswerGroup]
(
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[AnswerGroupId] INT,
	[Status] INT,
	[LastAnswer] NVARCHAR(MAX)
);