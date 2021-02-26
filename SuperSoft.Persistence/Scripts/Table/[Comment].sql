CREATE TABLE [Comment]
(
    [Id] INT PRIMARY KEY IDENTITY,
    [UserId] INT REFERENCES [UserId] INT,
    [Text] NVARCHAR(MAX),
    [PublishDate] DATETIME,
    [GroupId] INT REFERENCES [CommentGroup]([Id]) ON DELETE CASCADE
);