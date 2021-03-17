CREATE TABLE [Subtag]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(100)
);

CREATE TYPE [UDT_Subtag] AS TABLE
(
	[Id] INT,
	[TagId] INT,
	[Name] NVARCHAR(100)
);

CREATE TABLE [Subtag_Tag]
(
	[TagId] INT REFERENCES [Tag]([Id]) ON DELETE CASCADE,
	[SubtagId] INT REFERENCES [Subtag]([Id]) ON DELETE CASCADE
);

CREATE PROCEDURE [TagRepository_AddOrUpdateSubtags]
	@subtags [UDT_Subtag] READONLY,
	@tagId INT
AS
BEGIN
	DECLARE @mergedIds AS TABLE ([Id] INT);

	MERGE
	INTO [Subtag] AS [dest]
	USING @subtags AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN NOT MATCHED THEN
		INSERT (
			[Name]
		)
		VALUES (
			[src].[Name]
		)
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[Name] = [src].[Name]
	OUTPUT INSERTED.ID INTO @mergedIds;

	MERGE
	INTO [Subtag_Tag] AS [dest]
	USING @mergedIds AS [src]
	ON [dest].[SubtagId] = [src].[Id]
		AND [dest].[TagId] = @tagId
	WHEN NOT MATCHED THEN
		INSERT (
			[SubtagId],
			[TagId]
		) VALUES (
			[src].[Id],
			@tagId
		);
END

CREATE PROCEDURE [TagRepository_DeleteSubtag]
	@subtagId INT
AS
BEGIN
	DELETE
	FROM [Subtag]
	WHERE [Id] = @subtagId;
END

CREATE PROCEDURE [TagRepository_GetSubtagsByTag]
	@tagId INT
AS
BEGIN
	DECLARE @subtagIds TABLE ([Id] INT);
	DECLARE @subtags [UDT_Subtag];

	INSERT
	INTO @subtagIds (
		[Id]
	) 
	SELECT
		[SubtagId]
	FROM [Subtag_Tag]
	WHERE [TagId] = @tagId;

	INSERT
	INTO @subtags (
		[Id],
		[Name],
		[TagId]
	) SELECT
		[Id],
		[Name],
		@tagId
	FROM [Subtag]
	WHERE [Id] IN (
		SELECT [Id] 
		FROM @subtagIds
	);

	SELECT * FROM @subtags;
END

alter PROCEDURE [TagRepository_GetTags]
AS
BEGIN
	DECLARE @tags [UDT_Tag];
	DECLARE @subtags [UDT_Subtag];

	INSERT
	INTO @tags (
		[Id],
		[Name]
	)
	SELECT
		[Id],
		[Name]
	FROM [Tag];

	INSERT
	INTO @subtags (
		[Id],
		[TagId],
		[Name]
	)
	SELECT
		[s].[Id],
		[st].[TagId],
		[s].[Name]
	FROM [Subtag] AS [s]
	JOIN [Subtag_Tag] AS [st]
	ON [s].[Id] = [st].[SubtagId];

	SELECT * FROM @tags;
	SELECT * FROM @subtags;
END