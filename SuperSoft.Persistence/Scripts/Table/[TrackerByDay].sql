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