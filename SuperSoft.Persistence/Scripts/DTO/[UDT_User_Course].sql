CREATE TYPE [UDT_User_Course] AS TABLE
(
	[UserId] INT,
	[CourseId] INT,
	[Tarif] INT,
	[StartDate] DATETIME2 NULL,
	[ExpireDate] DATETIME2 NULL,
	[CourseRole] INT
);