import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { Client } from '@stomp/stompjs';
import {InboxUser} from '../model/inbox-user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/api/chat';
  private stompClient!: Client;
  private chatUrl = 'http://localhost:8080/chat';

  constructor(private http: HttpClient) {}

  connect(userId: string, onMessageReceived: (message: Message) => void): void {
    console.log('Token in connectHeaders:', localStorage.getItem('user'));

    this.stompClient = new Client({
      brokerURL: `ws://localhost:8080/chat?token=${localStorage.getItem('user')}`, // pure websocket URL with token param
      debug: (msg) => console.log('[STOMP DEBUG]', msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        token: localStorage.getItem('user') || ''
      }
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      // this.stompClient.subscribe('/topic/messages', (msg) => {
      //   console.log('Message from /topic/messages:', msg);
      // });
      this.stompClient.subscribe('/user/queue/messages', (message) => {
        console.log('Received message body:', message.body);
        onMessageReceived(JSON.parse(message.body));
      }, { id: 'mySubscription' });
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }

  sendMessage(message: Message): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify(message)
      });
    }
  }

  getChatHistory(senderId: string, receiverId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/history?senderId=${senderId}&receiverId=${receiverId}`);
  }

  getInboxUsers(currentUserId: string): Observable<InboxUser[]> {
    return this.http.get<InboxUser[]>(`${this.apiUrl}/inbox/${currentUserId}`);
  }

  markMessagesAsSeen(userId: string, otherUserId: string) {
    return this.http.post(`${this.apiUrl}/messages/mark-seen`, {
      userId,
      otherUserId
    });
  }
}
