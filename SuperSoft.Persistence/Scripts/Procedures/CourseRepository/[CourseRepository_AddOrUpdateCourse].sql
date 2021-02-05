CREATE PROCEDURE [dbo].[CourseRepository_AddOrUpdateCourse]
	@course [UDT_Course] READONLY
AS
BEGIN
	DECLARE @mergedIds TABLE([Id] INT);

	MERGE
	INTO [Course] AS [dest]
	USING @course AS [src]
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

	DECLARE @courseId INT = (SELECT TOP 1 [Id] FROM @mergedIds);

	SELECT @courseId;
END