CREATE TABLE [User_Course]
(
	[UserId] INT REFERENCES [User]([Id]) ON DELETE CASCADE,
	[CourseId] INT REFERENCES [Course]([Id]) ON DELETE CASCADE,
	[Tarif] INT,
	[StartDate] DATETIME2,
	[ExpireDate] DATETIME2,
	[CourseRole] INT,
	CONSTRAINT [PK_User_Course] PRIMARY KEY ([UserId], [CourseId])
);