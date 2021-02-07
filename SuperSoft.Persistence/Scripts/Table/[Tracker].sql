﻿CREATE TABLE [Tracker]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[CourseId] INT REFERENCES [Course]([Id]) ON DELETE CASCADE,
	CONSTRAINT [UQ_User_Course] UNIQUE([UserId], [CourseId])
);