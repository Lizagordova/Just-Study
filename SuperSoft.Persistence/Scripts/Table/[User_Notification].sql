CREATE TABLE [User_Notification]
(
	[UserId] INT REFERENCES [User]([Id]),
	[NotificationId] INT REFERENCES [Notification]([Id]) ON DELETE CASCADE,
	[Seen] BIT
);