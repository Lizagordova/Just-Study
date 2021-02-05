CREATE TYPE [UDT_Lesson_Material] AS TABLE
(
	[Id] INT,
	[LessonId] INT,
	[Path] NVARCHAR(MAX),
	[Url] NVARCHAR(MAX)
);