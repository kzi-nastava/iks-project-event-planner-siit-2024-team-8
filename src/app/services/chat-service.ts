import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/api/chat';
  private stompClient!: Client;
  private chatUrl = 'http://localhost:8080/chat';

  constructor(private http: HttpClient) {}

  connect(userId: string, onMessageReceived: (message: Message) => void): void {
    const socket = new SockJS(this.chatUrl + `?token=${localStorage.getItem('user')}`);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log(msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      this.stompClient.subscribe(`/topic/messages/${userId}`, (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
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
}
