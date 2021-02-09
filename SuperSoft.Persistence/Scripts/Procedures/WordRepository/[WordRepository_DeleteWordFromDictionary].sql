CREATE PROCEDURE [WordRepository_DeleteWordFromDictionary]
	@wordId INT
AS
BEGIN
	DECLARE @exampleIds TABLE([Id] INT);

	INSERT
	INTO @exampleIds (
		[Id]
	)
	SELECT
		[ExampleId]
	FROM [Word_Example];

	DELETE
	FROM [Word]
	WHERE [Id] = @wordId;

	DELETE
	FROM [Example]
	WHERE [Id] IN (
		SELECT [Id]
		FROM @exampleIds
	);
END