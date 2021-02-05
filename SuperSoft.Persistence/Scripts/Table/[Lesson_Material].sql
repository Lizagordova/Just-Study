CREATE TABLE [Lesson_Material]
(
	[Id] INT,
	[LessonId] INT REFERENCES [Lesson]([Id]) ON DELETE CASCADE,
	[Path] NVARCHAR(MAX),
	[Url] NVARCHAR(MAX)
);