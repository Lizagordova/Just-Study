CREATE TABLE [Word]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[Word] NVARCHAR(100),
	[PartOfSpeech] INT,
	[EnglishMeaning] NVARCHAR(MAX),
	[RussianMeaning] NVARCHAR(MAX)
);