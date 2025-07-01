export interface Message {
  id?: string;
  senderId: string;
  receiverId: string;
  messageContent: string;
  sentAt?: string;
  deleted?: boolean;
}
