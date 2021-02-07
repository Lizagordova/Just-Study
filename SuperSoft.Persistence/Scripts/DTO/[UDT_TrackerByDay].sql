CREATE TYPE [UDT_TrackerByDay] AS TABLE (
	[Id] INT,
	[TrackerId] INT,
	[WebinarWatch] BIT,
	[CompletedHomework] BIT,
	[WordOfADay] BIT,
	[DictionaryOfLesson] BIT,
	[ChatParticipation] BIT,
	[Day] INT
);