import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EventInfoResponse } from '../../event/domain/EventInfoResponse';
import { EventService } from '../../services/event-service';
import {Utility} from '../../model/utility';
import {ToastService} from '../../services/toast-service';
import {
  ReservationDateTimeComponentComponent
} from '../reservation-date-time-component/reservation-date-time-component.component';

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
  ) {
    if (!this.data?.email){
      this.toastService.showErrorToast('Email not provided!');
      return;
    }
    if(!this.data?.utility){
      this.toastService.showErrorToast('Event not provided!');
      return;
    }
  }

  ngOnInit(): void {
    this.eventService.getOrganizedEvents(this.data.email).subscribe({
      next: (data: EventInfoResponse[]) => {
        this.events = data;
        this.hasEvents = data.length > 0;
      },
      error: (error) => {
        this.toastService.showErrorToast("Error getting event list!");
        this.hasEvents = false;
      }
    });
    if(!this.data?.email){this.toastService.showErrorToast('Email not provided!');return;}
    if(!this.data?.utility){this.toastService.showErrorToast('Utility not provided!');return;}
  }
  isAfterBookingDate(event : EventInfoResponse) {
    if(!event?.startDate){this.toastService.showErrorToast('Start date is invalid!');return true;}
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
