CREATE TABLE [User_Notification]
(
	[UserId] INT,
	[NotificationId] INT REFERENCES [Notification]([Id]) ON DELETE CASCADE,
	[Seen] BIT
);