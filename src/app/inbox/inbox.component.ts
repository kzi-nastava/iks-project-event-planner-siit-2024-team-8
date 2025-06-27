import { Component, OnInit } from '@angular/core';
import { InboxUser } from '../model/inbox-user';
import { ChatService } from '../services/chat-service';
import { AuthService } from '../infrastructure/auth/auth.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  inboxUsers: InboxUser[] = [];
  currentUserId!: string;

  selectedUser: InboxUser | null = null; // Track open chat user

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.chatService.getInboxUsers(this.currentUserId).subscribe(users => {
      this.inboxUsers = users.sort((a, b) => {
        const timeA = new Date(a.lastMessageTime).getTime();
        const timeB = new Date(b.lastMessageTime).getTime();
        return timeB - timeA;
      });
    });
  }

  openChat(user: InboxUser): void {
    this.selectedUser = null;
    setTimeout(() => {
      this.selectedUser = user;
    }, 0);
    if (user.hasUnreadMessage) {
      user.hasUnreadMessage = false;
      this.chatService.markMessagesAsSeen(this.currentUserId, user.userId).subscribe({
        next: () => console.log(`Marked messages with ${user.fullName} as seen`),
        error: (err) => console.error('Failed to mark messages as seen', err)
      });
    }
  }

  closeChat(): void {
    this.selectedUser = null;
  }

  protected readonly close = close;
}
