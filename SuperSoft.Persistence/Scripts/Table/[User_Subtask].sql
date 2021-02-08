CREATE TABLE [User_Subtask]
(
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[SubtaskId] INT REFERENCES [Subtask]([Id]) ON DELETE CASCADE,
	[Answer] NVARCHAR(MAX),
	[AnswerPath] NVARCHAR(MAX),
	[Status] INT,
	CONSTRAINT [UQ_User_Subtask] UNIQUE([UserId], [SubtaskId])
);