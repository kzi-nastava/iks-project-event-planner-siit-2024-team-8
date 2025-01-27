import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.scss']
})
export class ChatPopupComponent {
  @Input() otherUserName!: string;
  messages = [
    { sender: 'otherUser', text: 'Hello! How can I assist you?' }
  ];
  newMessage = '';

  @Output() close = new EventEmitter<void>();

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'user', text: this.newMessage.trim() });
      this.newMessage = '';
    }
  }

  closeChat() {
    this.close.emit();
  }
}
