CREATE PROCEDURE [GarbageRepository_AddFileToDelete]
	@fileToDelete [UDT_FileToDelete] READONLY
AS
BEGIN
	MERGE
	INTO [QueueToDelete] AS [dest]
	USING @fileToDelete AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN NOT MATCHED THEN
		INSERT (
			[Path]
		) VALUES (
			[src].[Path]
		);
END