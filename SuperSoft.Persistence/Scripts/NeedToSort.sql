CREATE TABLE [User]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[Login] NVARCHAR(100),
	[FirstName] NVARCHAR(100),
	[LastName] NVARCHAR(100),
	[PasswordHash] NVARCHAR(MAX),
	[Role] NVARCHAR(50),
	[Token] NVARCHAR(MAX),
	[Email] NVARCHAR(MAX)
);

CREATE TYPE [UDT_User] AS TABLE (
	[Id] INT,
	[Login] NVARCHAR(100),
	[FirstName] NVARCHAR(100),
	[LastName] NVARCHAR(100),
	[PasswordHash] NVARCHAR(MAX),
	[Role] NVARCHAR(50),
	[Token] NVARCHAR(MAX),
	[Email] NVARCHAR(MAX)
);

CREATE TABLE [Course]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(50),
	[Description] NVARCHAR(MAX)
);

CREATE TYPE [UDT_Course] AS TABLE (
	[Id] INT,
	[Name] NVARCHAR(50),
	[Description] NVARCHAR(MAX)
);

CREATE TABLE [User_Course]
(
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[CourseId] INT REFERENCES [Course]([Id]) ON DELETE CASCADE,
	[Tarif] INT,
	[StartDate] DATETIME2,
	[ExpireDate] DATETIME2,
	CONSTRAINT [PK_User_Course] PRIMARY KEY ([UserId], [CourseId])
);

CREATE TYPE [UDT_User_Course] AS TABLE
(
	[UserId] INT,
	[CourseId] INT,
	[Tarif] INT,
	[StartDate] DATETIME2,
	[ExpireDate] DATETIME2
);

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
	CONSTRAINT [Q_Word_Example] UNIQUE([WordId], [ExampleId])
);

CREATE TABLE [WordOfADay]
(
	[CourseId] INT REFERENCES [Course]([Id]) ON DELETE CASCADE,
	[Date] DATETIME2,
	[WordId] INT REFERENCES [Word]([Id]) ON DELETE CASCADE,
	CONSTRAINT [PK_Course_Date] PRIMARY KEY ([CourseId], [Date])
);