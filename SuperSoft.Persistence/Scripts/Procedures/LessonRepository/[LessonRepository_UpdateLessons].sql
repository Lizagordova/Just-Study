CREATE PROCEDURE [LessonRepository_UpdateLessons]
	@lessonCourses[UDT_Lesson_Course] READONLY
AS
BEGIN
MERGE
    INTO [Lesson_Course] AS [dest]
    USING @lessonCourses AS [src]
    ON [dest].[LessonId] = [src].[LessonId]
    AND [dest].[CourseId] = [src].[CourseId]
    WHEN MATCHED THEN
UPDATE
    SET
    [dest].[Order] = [src].[Order];
END