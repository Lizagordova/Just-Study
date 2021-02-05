CREATE TYPE [UDT_Lesson_Course] AS TABLE
(
	[LessonId] INT,
	[CourseId] INT,
	[Order] INT,
	[StartDate] DATETIME2,
	[ExpireDate] DATETIME2
);