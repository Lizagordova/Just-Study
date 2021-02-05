CREATE TABLE [User_Word]
(
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[WordId] INT REFERENCES [Word]([Id]) ON DELETE CASCADE,
	[Answer] NVARCHAR(MAX),
	[Status] INT,
	[CountOfAttempts] INT,
	[RightAnswers] INT,
	CONSTRAINT [PK_User_Word] PRIMARY KEY ([UserId], [WordId])
);