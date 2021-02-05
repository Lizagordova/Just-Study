CREATE TYPE [UDT_Word] AS TABLE
(
	[Id] INT, 
	[Word] NVARCHAR(100),
	[PartOfSpeech] INT,
	[EnglishMeaning] NVARCHAR(MAX),
	[RussianMeaning] NVARCHAR(MAX)
);