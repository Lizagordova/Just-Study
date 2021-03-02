CREATE PROCEDURE [FeedbackRepository_GetFeedbacks]
	@old BIT
AS
BEGIN
	DECLARE @feedbacks [UDT_Feedback];

	INSERT
	INTO @feedbacks (
		[Id],
		[Name],
		[Email],
		[Message]
	)
	SELECT
		[Id],
		[Name],
		[Email],
		[Message]
	FROM [Feedback]
	WHERE [Old] = @old;

	SELECT * FROM @feedbacks;
END