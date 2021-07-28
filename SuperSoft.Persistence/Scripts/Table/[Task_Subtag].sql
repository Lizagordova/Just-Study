CREATE TABLE [Task_Subtag]
(
	[TaskId] INT REFERENCES [Tag]([Id]) ON DELETE CASCADE,
	[SubtagId] INT REFERENCES [Subtag]([Id]) ON DELETE CASCADE,
	CONSTRAINT [UQ_Task_Subtag] UNIQUE([TaskId], [SubtagId])
);