import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../model/message';
import {ChatService} from '../services/chat-service';

@Component({
  selector: 'app-chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.scss']
})
export class ChatPopupComponent implements OnInit, OnDestroy {
  @Input() otherUserName!: string;
  @Input() userId!: string;
  @Input() otherUserId!: string;
  @Output() close = new EventEmitter<void>();

  messages: Message[] = [];
  newMessage = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.connect(this.userId, (message: Message) => {
      this.messages.push(message);
    });

    this.loadChatHistory();
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  loadChatHistory(): void {
    this.chatService.getChatHistory(this.userId, this.otherUserId).subscribe((history) => {
      this.messages = history;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message: Message = {
        senderId: this.userId,
        receiverId: this.otherUserId,
        messageContent: this.newMessage.trim(),
        sentAt: new Date().toISOString(),
        deleted: false
      };

      this.chatService.sendMessage(message);
      this.messages.push(message);
      this.newMessage = '';
    }
  }

  closeChat(): void {
    this.close.emit();
  }
}
