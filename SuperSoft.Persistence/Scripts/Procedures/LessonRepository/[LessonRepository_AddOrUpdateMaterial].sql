CREATE PROCEDURE [LessonRepository_AddOrUpdateMaterial]
	@lessonMaterial [UDT_Lesson_Material] READONLY
AS
BEGIN
	DECLARE @mergedIds TABLE([Id] INT);

	MERGE
	INTO [Lesson_Material] AS [dest]
	USING @lessonMaterial AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[Path] = [src].[Path],
			[dest].[Url] = [src].[Url]
	WHEN NOT MATCHED THEN
		INSERT (
			[LessonId],
			[Path],
			[Url]
		)
		VALUES (
			[src].[LessonId],
			[src].[Path],
			[src].[Url]
		)
	OUTPUT INSERTED.ID INTO @mergedIds;

	DECLARE @materialId INT = (SELECT TOP 1 [Id] FROM @mergedIds);

	SELECT @materialId;
END