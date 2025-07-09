import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import { Notification } from '../model/notification';
import {ToastService} from './toast-service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/notifications';
  private stompClient!: Client;

  constructor(private http: HttpClient, private toastService : ToastService) { }

  connect(userId: string, onNotificationReceived?: (notification: Notification) => void): void {
    this.stompClient = new Client({
      brokerURL: `ws://localhost:8080/chat?token=${localStorage.getItem('user')}`,
      debug: (msg) => console.log('[NOTIFICATION DEBUG]', msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        token: localStorage.getItem('user') || ''
      }
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to Notification WebSocket');

      this.stompClient.subscribe('/user/queue/notifications', (message) => {
        console.log('Notification received:', message.body);
        const notification: Notification = JSON.parse(message.body);

        this.toastService.showToast({
          message: notification.body,
          title: notification.title,
          type: 'success', // or 'error' if needed
          duration: 5000
        });

        if (onNotificationReceived) {
          onNotificationReceived(notification);
        }
      }, { id: 'notifSubscription' });
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }

  getNotifications(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/${userId}`);
  }

  markAsSeen(notificationId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/seen/${notificationId}`, {});
  }

  markAllAsSeen(userId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/seen/all/${userId}`, {});
  }
}
