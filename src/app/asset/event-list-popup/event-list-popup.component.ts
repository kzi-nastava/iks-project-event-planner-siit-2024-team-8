import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EventInfoResponse } from '../../event/domain/EventInfoResponse';
import { EventService } from '../../services/event-service';
import {
  ReservationDateTimeComponentComponent
} from '../reservation-date-time-component/reservation-date-time-component.component';
import {Utility} from '../../model/utility';
import {ToastService} from '../../services/toast-service';

@Component({
  selector: 'app-event-list-popup',
  templateUrl: './event-list-popup.component.html',
  styleUrls: ['./event-list-popup.component.css']
})
export class EventListPopupComponent implements OnInit {
  events: EventInfoResponse[] = [];
  hasEvents: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<EventListPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string , utility: Utility },
    private eventService: EventService,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.eventService.getOrganizedEvents(this.data.email).subscribe({
      next: (data: EventInfoResponse[]) => {
        this.events = data;
        this.hasEvents = data.length > 0;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
        this.hasEvents = false;
      }
    });
  }
  isAfterBookingDate(event : EventInfoResponse) {
    const startDate = new Date(event.startDate);
    const lastBookingDate = new Date(event.startDate);
    lastBookingDate.setDate(lastBookingDate.getDate() - this.data.utility.reservationTerm);
    const now = new Date();

    return now > lastBookingDate;
  }

  onEventClick(event: EventInfoResponse): void {
    if(!this.data.utility){
      this.dialogRef.close(event);
    }
    if (this.isAfterBookingDate(event)){
        this.toastService.showErrorToast("Reservation term has passed for this event!")
        return;
    }
    const dialogRef = this.dialog.open(ReservationDateTimeComponentComponent, {
      data: { event: event , utility : this.data.utility },
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close();
    })
  }
}
