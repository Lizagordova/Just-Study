CREATE PROCEDURE [LessonRepository_AddOrUpdateLessonCourse]
	@lessonCourse [UDT_Lesson_Course] READONLY
AS
BEGIN
	DECLARE @order INT = (SELECT [Order] FROM @lessonCourse);
	DECLARE @courseId INT = (SELECT [CourseId] FROM @lessonCourse);
	DECLARE @lessonId INT = (SELECT [LessonId] FROM @lessonCourse);

	DECLARE @existLessonWithTheOrder INT = (SELECT TOP 1 [LessonId] FROM [Lesson_Course] WHERE [Order] = @order AND [CourseId] = @courseId);

	IF (@order IS NOT NULL AND @existLessonWithTheOrder IS NOT NULL AND @lessonId = 0)
		OR (@lessonId != 0 AND @order != (SELECT [Order] FROM [Lesson_Course] WHERE [LessonId] = @lessonId))
		UPDATE [Lesson_Course]
		SET
			[Order] = [Order] + 1
		WHERE [Order] >= @order
			AND [CourseId] = @courseId;

	MERGE
	INTO [Lesson_Course] AS [dest]
	USING @lessonCourse AS [src]
	ON [dest].[LessonId] = [src].[LessonId]
		AND [dest].[CourseId] = [src].[CourseId]
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[Order] = [src].[Order],
			[dest].[StartDate] = [src].[StartDate],
			[dest].[ExpireDate] = [src].[ExpireDate]
	WHEN NOT MATCHED THEN
		INSERT (
			[LessonId],
			[CourseId],
			[Order],
			[StartDate],
			[ExpireDate]
		)
		VALUES (
			[src].[LessonId],
			[src].[CourseId],
			[src].[Order],
			[src].[StartDate],
			[src].[ExpireDate]
		);

END