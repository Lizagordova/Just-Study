CREATE PROCEDURE [TagRepository_GetSubtagsByTag]
	@tagId INT
AS
BEGIN
	DECLARE @subtagIds TABLE ([Id] INT);
	DECLARE @subtags [UDT_Subtag];

	INSERT
	INTO @subtagIds (
		[Id]
	) 
	SELECT
		[SubtagId]
	FROM [Subtag_Tag]
	WHERE [TagId] = @tagId;

	INSERT
	INTO @subtags (
		[Id],
		[Name],
		[TagId]
	) SELECT
		[Id],
		[Name],
		@tagId
	FROM [Subtag]
	WHERE [Id] IN (
		SELECT [Id] 
		FROM @subtagIds
	);

	SELECT * FROM @subtags;
END