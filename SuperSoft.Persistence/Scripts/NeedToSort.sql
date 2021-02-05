CREATE TABLE [Word]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[Word] NVARCHAR(100),
	[PartOfSpeech] NVARCHAR(100),
	[EnglishMeaning] NVARCHAR(MAX),
	[RussianMeaning] NVARCHAR(MAX)
);

CREATE TYPE [UDT_Word] AS TABLE
(
	[Id] INT, 
	[Word] NVARCHAR(100),
	[PartOfSpeech] NVARCHAR(100),
	[EnglishMeaning] NVARCHAR(MAX),
	[RussianMeaning] NVARCHAR(MAX)
);

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

CREATE TABLE [Example]
(	
	[Id] INT PRIMARY KEY IDENTITY,
	[Example] NVARCHAR(MAX)
);

CREATE TYPE [UDT_Example] AS TABLE
(
	[Id] INT,
	[WordId] INT,
	[Example] NVARCHAR(MAX)
);

CREATE TABLE [Word_Example]
(
	[WordId] INT REFERENCES [Word]([Id]) ON DELETE CASCADE,
	[ExampleId] INT REFERENCES [Example]([Id]) ON DELETE CASCADE,
	CONSTRAINT [UQ_Word_Example] UNIQUE([WordId], [ExampleId])
);

CREATE TABLE [WordOfADay]
(
	[CourseId] INT REFERENCES [Course]([Id]) ON DELETE CASCADE,
	[Date] DATETIME2,
	[WordId] INT REFERENCES [Word]([Id]) ON DELETE CASCADE,
	CONSTRAINT [PK_Course_Date] PRIMARY KEY ([CourseId], [Date])
);

CREATE TABLE [CommentGroup]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[CommentedEntityType] INT,
	[CommentedEntityId] INT,
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	CONSTRAINT [UQ_CommentGroup] UNIQUE ([CommentedEntityType], [CommentedEntityId], [UserId])
);

CREATE TYPE [UDT_CommentGroup] AS TABLE
(
	[Id] INT,
	[CommentedEntityType] INT,
	[CommentedEntityId] INT,
	[UserId] INT
);

CREATE TABLE [Comment]
(
	[Id] INT PRIMARY KEY IDENTITY,	
	[UserId] INT,
	[Text] NVARCHAR(MAX),
	[PublishDate] DATETIME2,
	[GroupId] INT REFERENCES [CommentGroup]([Id]) ON DELETE CASCADE
);

CREATE TYPE [UDT_Comment] AS TABLE
(
	[Id] INT,
	[UserId] INT,
	[Text] NVARCHAR(MAX),
	[PublishDate] DATETIME2,
	[GroupId] INT
);

CREATE TABLE [Log] (
	[Id] INT PRIMARY KEY IDENTITY,
	[Message] NVARCHAR(MAX),
	[LogLevel] NVARCHAR(20),
	[CustomMessage] NVARCHAR(MAX)
);

CREATE TYPE [UDT_Log] AS TABLE
(
	[Id] INT,
	[Message] NVARCHAR(MAX),
	[LogLevel] NVARCHAR(20),
	[CustomMessage] NVARCHAR(MAX)
);

CREATE TABLE [Tracker]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[CourseId] INT REFERENCES [Course]([Id]) ON DELETE CASCADE,
	CONSTRAINT [UQ_User_Course] UNIQUE([UserId], [CourseId])
);

CREATE TABLE [TrackerByDay]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[WebinarWatch] BIT,
	[CompletedHomework] BIT,
	[WordOfADay] BIT,
	[DictionaryOfLesson] BIT,
	[ChatParticipation] BIT,
	[Day] INT
);

CREATE TABLE [TrackerWhole]
(
	[TrackerId] INT REFERENCES [Tracker]([Id]) ON DELETE CASCADE,
	[TrackerByDayId] INT REFERENCES [TrackerByDay]([Id]) ON DELETE CASCADE
);

CREATE TABLE [UDT_Tracker]
(
	[Id] INT,
	[UserId] INT,
	[CourseId] INT
);

CREATE TYPE [UDT_TrackerByDay] AS TABLE (
	[Id] INT,
	[TrackerId] INT,
	[VebinarWatch] BIT,
	[CompleteHomework] BIT,
	[WordOfADay] BIT,
	[DictionaryOfLesson] BIT,
	[ChatParticipation] BIT,
	[Day] INT
);

CREATE TABLE [Lesson]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[CourseId] INT REFERENCES [Course]([Id]) ON DELETE CASCADE,
	[Description] NVARCHAR(MAX),
	[Order] INT,
	[StartDate] DATETIME2,
	[ExpireDate] DATETIME2
);

CREATE TYPE [UDT_Lesson] AS TABLE
(
	[Id] INT,
	[CourseId] INT,
	[Description] NVARCHAR(MAX),
	[Order] INT,
	[StartDate] DATETIME2,
	[ExpireDate] DATETIME2
);

CREATE TABLE [LessonMaterial]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[LessonId] INT REFERENCES [Lesson]([Id]) ON DELETE CASCADE,
	[Path] NVARCHAR(MAX),
	[Url] NVARCHAR(MAX)
);

CREATE TYPE [UDT_LessonMaterial] AS TABLE
(
	[Id] INT,
	[LessonId] INT,
	[Path] NVARCHAR(MAX),
	[Url] NVARCHAR(MAX)
);

CREATE TABLE [Tag]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(MAX)
);

CREATE TYPE [UDT_Tag] AS TABLE
(
	[Id] INT,
	[Name] NVARCHAR(MAX)
);

CREATE TABLE [Task] 
(
	[Id] INT PRIMARY KEY IDENTITY,
	[Instruction] NVARCHAR(MAX),
	[Text] NVARCHAR(MAX),
	[Order] INT
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

CREATE TABLE [Notification]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[CreatedBy] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[Message] NVARCHAR (MAX),
	[Date] DATETIME2
);

CREATE TYPE [UDT_Notification] AS TABLE
(
	[Id] INT,
	[CreatedBy] INT,
	[Message] NVARCHAR(MAX),
	[Date] DATETIME2
);

CREATE TABLE [User_Notification]
(
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[NotificationId] INT REFERENCES [Notification]([Id]) ON DELETE CASCADE,
	[Seen] BIT
);

CREATE TYPE [UDT_User_Notification] AS TABLE
(
	[UserId] INT,
	[NotificationId] INT,
	[Seen] BIT
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