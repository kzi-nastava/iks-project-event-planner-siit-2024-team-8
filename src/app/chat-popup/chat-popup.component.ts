import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  EventEmitter,
  Output, Input
} from '@angular/core';
import { Message } from '../model/message';
import {ChatService} from '../services/chat-service';

@Component({
  selector: 'app-chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.css']
})
export class ChatPopupComponent implements OnInit, AfterViewChecked {
  @Input() otherUserName!: string;
  @Input() userId!: string;
  @Input() otherUserId!: string;
  @Output() close = new EventEmitter<void>();

  messages: Message[] = [];
  newMessage = '';
  private shouldScroll = false;
  @ViewChild('chatMessagesContainer') private chatMessagesContainer!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.connect(this.userId, (message: Message) => {
      const isCurrentConversation =
        (message.senderId === this.otherUserId && message.receiverId === this.userId) ||
        (message.senderId === this.userId && message.receiverId === this.otherUserId);

      if (isCurrentConversation) {
        this.messages.push(message);
        this.shouldScroll = true;

        if (message.senderId === this.otherUserId && message.receiverId === this.userId) {
          this.chatService.markMessagesAsSeen(this.userId, this.otherUserId).subscribe({
            next: () => console.log('Marked messages as seen'),
            error: (err) => console.error('Error marking messages as seen', err)
          });
        }
      } else {
        console.log(`Someone else sent a message.`);
      }
    });

    this.loadChatHistory();
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  loadChatHistory(): void {
    this.chatService.getChatHistory(this.userId, this.otherUserId).subscribe((history) => {
      this.messages = history;
      this.shouldScroll = true;
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
      this.newMessage = '';
      this.shouldScroll = true;
    }
  }

  closeChat(): void {
    this.close.emit();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}
