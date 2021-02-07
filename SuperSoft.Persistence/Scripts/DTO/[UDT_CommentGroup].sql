CREATE TYPE [UDT_CommentGroup] AS TABLE
(
	[Id] INT,
	[CommentedEntityType] INT,
	[CommentedEntityId] INT,
	[UserId] INT
);