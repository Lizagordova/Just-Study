CREATE TYPE [UDT_Tag] AS TABLE
(
	[Id] INT,
	[Name] NVARCHAR(MAX)
);

CREATE TYPE [UDT_Task] AS TABLE
(
	[Id] INT,
	[Instruction] NVARCHAR(MAX),
	[Text] NVARCHAR(MAX)
);

CREATE TABLE [Lesson_Task]
(
	[TaskId] INT REFERENCES [Task]([Id]) ON DELETE CASCADE,
	[LessonId] INT REFERENCES [Lesson]([Id]) ON DELETE CASCADE,
	[Order] INT,
	CONSTRAINT [PK_Task_Lesson] PRIMARY KEY ([TaskId], [LessonId])
);

CREATE TABLE [Task_Tag]
(
	[TagId] INT REFERENCES [Tag]([Id]) ON DELETE CASCADE,
	[TaskId] INT REFERENCES [Task]([Id]) ON DELETE CASCADE,
	CONSTRAINT [UQ_Tag_Task] UNIQUE([TagId], [TaskId])
);

CREATE TYPE [UDT_TaskTag] AS TABLE
(
	[TagId] INT,
	[TaskId] INT
);

CREATE TABLE [Subtask] 
(
	[Id] INT PRIMARY KEY IDENTITY,
	[TaskId] INT REFERENCES [Task]([Id]) ON DELETE CASCADE,
	[Text] NVARCHAR(MAX),
	[Path] NVARCHAR(MAX),
	[Order] INT,
	[SubtaskType] INT
);

CREATE TYPE [UDT_Subtask] AS TABLE
(
	[Id] INT,
	[TaskId] INT,
	[Text] NVARCHAR(MAX),
	[Path] NVARCHAR(MAX),
	[Order] INT,
	[SubtaskType] INT
);

CREATE TABLE [User_Subtask]
(
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[SubtaskId] INT REFERENCES [Subtask]([Id]) ON DELETE CASCADE,
	[Answer] NVARCHAR(MAX),
	[AnswerPath] NVARCHAR(MAX),
	[Status] INT,
	CONSTRAINT [UQ_User_Subtask] UNIQUE([UserId], [SubtaskId])
);

CREATE TYPE [UDT_User_Subtask] AS TABLE (
	[UserId] INT,
	[SubtaskId] INT,
	[Answer] NVARCHAR(MAX),
	[AnswerPath] NVARCHAR(MAX),
	[Status] INT
);

CREATE TABLE [SubtaskAnswerGroup]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[SubtaskId] INT REFERENCES [Subtask]([Id]) ON DELETE CASCADE
);

CREATE TYPE [UDT_SubtaskAnswerGroupUdt] AS TABLE
(
	[Id] INT,
	[SubtaskId] INT
);

CREATE TABLE [SubtaskAnswer]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[AnswerGroupId] INT REFERENCES [SubtaskAnswerGroup]([Id]) ON DELETE CASCADE,
	[Answer] NVARCHAR(MAX),
	[IsRight] BIT,
	[IsInfinitive] BIT,
	[Explanation] NVARCHAR(MAX)
);

CREATE TYPE [UDT_SubtaskAnswer] AS TABLE
(
	[Id] INT,
	[AnswerGroupId] INT,
	[Answer] NVARCHAR(MAX),
	[IsRight] BIT,
	[IsInfinitive] BIT,
	[Explanation] NVARCHAR(MAX)
);

CREATE TABLE [User_SubtaskAnswerGroup]
(
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[AnswerGroupId] INT,
	[Status] INT,
	[LastAnswer] NVARCHAR(MAX)
);

CREATE TYPE [UDT_UserSubtaskAnswerGroup] AS TABLE
(
	[UserId] INT,
	[AnswerGroupId] INT,
	[Status] INT,
	[LastAnswer] NVARCHAR(MAX)
);