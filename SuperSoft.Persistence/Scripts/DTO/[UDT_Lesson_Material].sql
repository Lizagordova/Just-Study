CREATE TYPE [UDT_Lesson_Material] AS TABLE
(
	[Id] INT,
	[LessonId] INT,
	[Path] NVARCHAR(MAX) NULL,
	[Url] NVARCHAR(MAX) NULL
);