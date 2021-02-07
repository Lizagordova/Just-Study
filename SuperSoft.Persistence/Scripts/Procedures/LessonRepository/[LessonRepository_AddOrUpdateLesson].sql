CREATE PROCEDURE [dbo].[LessonRepository_AddOrUpdateLesson]
	@lesson [UDT_Lesson] READONLY
AS
BEGIN
	DECLARE @mergedIds TABLE ([Id] INT);

	MERGE
	INTO [Lesson] AS [dest]
	USING @lesson AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN NOT MATCHED THEN
		INSERT (
			[Name],
			[Description]
		)
		VALUES (
			[src].[Name],
			[src].[Description]
		)
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[Name] = [src].[Name],
			[dest].[Description] = [src].[Description]
	OUTPUT INSERTED.ID INTO @mergedIds;

	DECLARE @lessonId INT = (SELECT TOP 1 [Id] FROM @mergedIds);

	SELECT @lessonId;
END