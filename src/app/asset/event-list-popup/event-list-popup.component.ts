import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventInfoResponse } from '../../event/domain/EventInfoResponse';
import { EventService } from '../../services/event-service';

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
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    private eventService: EventService
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

  onEventClick(event: EventInfoResponse): void {
    this.dialogRef.close(event);
  }
}
