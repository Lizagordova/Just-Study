CREATE TABLE [Lesson_Course]
(
	[LessonId] INT REFERENCES [Lesson]([Id]),
	[CourseId] INT REFERENCES [Course]([Id]),
	[Order] INT,
	[StartDate] DATETIME2,
	[ExpireDate] DATETIME2
);