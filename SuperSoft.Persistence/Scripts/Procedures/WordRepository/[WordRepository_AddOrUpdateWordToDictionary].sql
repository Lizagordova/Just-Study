CREATE PROCEDURE [WordRepository_AddOrUpdateWordToDictionary]
	@word [UDT_Word] READONLY,
	@examples [UDT_Example] READONLY
AS
BEGIN
	DECLARE @mergedWordIds TABLE([Id] INT);
	DECLARE @mergedExampleIds TABLE([Id] INT);

	/* Обновление слова */
	MERGE
	INTO [Word] AS [dest]
	USING @word AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN MATCHED THEN
		UPDATE
		SET
			[dest].[Word] = [src].[Word],
			[dest].[EnglishMeaning] = [src].[EnglishMeaning],
			[dest].[RussianMeaning] = [src].[RussianMeaning],
			[dest].[PartOfSpeech] = [src].[PartOfSpeech]
	WHEN NOT MATCHED THEN
		INSERT (
			[Word],
			[EnglishMeaning],
			[RussianMeaning],
			[PartOfSpeech]
		)
		VALUES (
			[src].[Word],
			[src].[EnglishMeaning],
			[src].[RussianMeaning],
			[src].[PartOfSpeech]
		)
	OUTPUT INSERTED.ID INTO @mergedWordIds;

	DECLARE @wordId INT = (SELECT TOP 1 [Id] FROM @mergedWordIds);

	/* Обновление примеров */
	MERGE
	INTO [Example] AS [dest]
	USING @examples AS [src]
	ON [dest].[Id] = [src].[Id]
	WHEN MATCHED THEN
		UPDATE
		SET
		[dest].[Example] = [src].[Example]
	WHEN NOT MATCHED THEN
		INSERT (
			[Example]
		)
		VALUES (
			[src].[Example]
		)
	OUTPUT INSERTED.ID INTO @mergedExampleIds;

	MERGE
	INTO [Word_Example] AS [dest]
	USING @mergedExampleIds AS [src]
	ON [dest].[ExampleId] = [src].[Id]
	WHEN NOT MATCHED THEN
		INSERT (
			[WordId],
			[ExampleId]
		)
		VALUES (
			@wordId,
			[src].[Id]
		);

	SELECT @wordId;
END