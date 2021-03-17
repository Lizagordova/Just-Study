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