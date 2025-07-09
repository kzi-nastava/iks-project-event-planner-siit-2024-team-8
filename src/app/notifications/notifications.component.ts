import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../services/notification-service';
import {AuthService} from '../infrastructure/auth/auth.service';
import {Notification} from '../model/notification';
import {MatDialog} from '@angular/material/dialog';
import {BudgetService} from '../services/budget-service';
import {ReservationDialogComponent} from '../dialogs/reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  currentUserId!: string;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private dialog: MatDialog,
    private budgetService: BudgetService,
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.loadNotifications();

    this.notificationService.connect(this.currentUserId, (notification: Notification) => {
      this.notifications.unshift(notification);
    });
  }

  loadNotifications(): void {
    this.notificationService.getNotifications(this.currentUserId).subscribe({
      next: (notifs) => {
        this.notifications = notifs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        console.log('Loaded notifications:', this.notifications);
        // NO automatic marking here
      },
      error: (err) => console.error('Failed to load notifications', err)
    });
  }

  onNotificationClick(notification: Notification): void {
    if (notification.clickable && notification.reservationId) {
      const dialogRef = this.dialog.open(ReservationDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'accept') {
          this.budgetService.acceptReservation(notification.reservationId).subscribe({
            next: () => console.log('Reservation accepted'),
            error: err => console.error('Failed to accept reservation', err)
          });
        } else if (result === 'deny') {
          this.budgetService.denyReservation(notification.reservationId).subscribe({
            next: () => console.log('Reservation denied'),
            error: err => console.error('Failed to deny reservation', err)
          });
        } else {
          console.log('Dialog closed without action');
        }
      });
    }

    if (!notification.seen) {
      this.notificationService.markAsSeen(notification.id).subscribe({
        next: () => {
          notification.seen = true;
        },
        error: (err) => console.error('Failed to mark notification as seen', err)
      });
    }
  }

  markAllAsSeen(): void {
    this.notificationService.markAllAsSeen(this.currentUserId).subscribe({
      next: () => {
        this.notifications.forEach(n => n.seen = true);
      },
      error: (err) => console.error('Failed to mark all as seen', err)
    });
  }
}
