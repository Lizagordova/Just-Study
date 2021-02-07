CREATE TABLE [Lesson_Task]
(
	[TaskId] INT REFERENCES [Task]([Id]) ON DELETE CASCADE,
	[LessonId] INT REFERENCES [Lesson]([Id]) ON DELETE CASCADE,
	[Order] INT,
	CONSTRAINT [PK_Task_Lesson] PRIMARY KEY ([TaskId], [LessonId])
);