CREATE PROCEDURE [CommentRepository_AddOrUpdateComment]
	@comment [UDT_Comment] READONLY
AS
BEGIN
	DECLARE @mergedIds TABLE ([Id] INT);

	MERGE
	INTO [Comment] AS [dest]
	USING @comment AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[UserId] = [src].[UserId],
			[dest].[Text] = [src].[Text],
			[dest].[PublishDate] = [src].[PublishDate],
			[dest].[GroupId] = [src].[GroupId]
	WHEN NOT MATCHED THEN
		INSERT (
			[UserId],
			[Text],
			[PublishDate],
			[GroupId]
		) VALUES (
			[src].[UserId],
			[src].[Text],
			[src].[PublishDate],
			[src].[GroupId]
		)
	OUTPUT INSERTED.ID INTO @mergedIds;

	DECLARE @commentId INT = (SELECT TOP 1 [Id] FROM @mergedIds);

	SELECT @commentId;
END