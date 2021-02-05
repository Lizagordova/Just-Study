CREATE PROCEDURE [LessonRepository_DeleteMaterial]
	@materialId INT
AS
BEGIN
	DELETE
	FROM [Lesson_Material]
	WHERE [Id] = @materialId;
END