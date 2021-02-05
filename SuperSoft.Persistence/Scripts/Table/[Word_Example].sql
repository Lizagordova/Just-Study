CREATE TABLE [Word_Example]
(
	[WordId] INT REFERENCES [Word]([Id]) ON DELETE CASCADE,
	[ExampleId] INT REFERENCES [Example]([Id]) ON DELETE CASCADE,
	CONSTRAINT [UQ_Word_Example] UNIQUE([WordId], [ExampleId])
);