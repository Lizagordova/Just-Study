CREATE PROCEDURE [FeedbackRepository_AddFeedback]
	@feedback [UDT_Feedback] READONLY
AS
BEGIN
	MERGE
	INTO [Feedback] AS [dest]
	USING @feedback AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[Name] = [src].[Name],
			[dest].[Email] = [src].[Email],
			[dest].[Message] = [src].[Message],
			[dest].[Old] = [src].[Old]
	WHEN NOT MATCHED THEN
		INSERT (
			[Name],
			[Email],
			[Message],
			[old]
		) VALUES (
			[src].[Name],
			[src].[Email],
			[src].[Message],
			[src].[Old]
		);
END