export interface InboxUser {
  userId: string;
  fullName: string;
  role: string;
  hasUnreadMessage: boolean;
  lastMessageTime: string;
}
