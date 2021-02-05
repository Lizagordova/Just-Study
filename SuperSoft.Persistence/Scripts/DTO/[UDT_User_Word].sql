CREATE TYPE [UDT_User_Word] AS TABLE
(
	[UserId] INT,
	[WordId] INT,
	[CountOfAttempts] INT,
	[RightAnswers] INT,
	[Status] INT,
	[Answer] NVARCHAR(MAX)
);