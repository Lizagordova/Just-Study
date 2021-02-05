CREATE TABLE [Lesson_Course]
(
	[LessonId] INT REFERENCES [Lesson]([Id]) ON DELETE CASCADE,
	[CourseId] INT REFERENCES [Course]([Id]) ON DELETE CASCADE,
	[Order] INT,
	[StartDate] DATETIME2,
	[ExpireDate] DATETIME2
);