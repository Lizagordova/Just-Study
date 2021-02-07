CREATE PROCEDURE [LogRepository_AddLog]
	@log [UDT_Log] READONLY
AS
BEGIN
	MERGE
	INTO [Log] AS [dest]
	USING @log AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[Message] = [src].[Message],
			[dest].[LogLevel] = [src].[LogLevel],
			[dest].[CustomMessage] = [src].[CustomMessage]
	WHEN NOT MATCHED THEN
		INSERT (
			[Message],
			[LogLevel],
			[CustomMessage]
		) VALUES (
			[src].[Message],
			[src].[LogLevel],
			[src].[CustomMessage]
		);
END