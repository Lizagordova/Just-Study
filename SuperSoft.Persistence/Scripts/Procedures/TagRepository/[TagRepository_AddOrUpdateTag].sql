CREATE PROCEDURE [TagRepository_AddOrUpdateTag]
	@tag [UDT_Tag] READONLY
AS
BEGIN
	MERGE
	INTO [Tag] AS [dest]
	USING @tag AS [src]
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
			[dest].[Name] = [src].[Name];
END