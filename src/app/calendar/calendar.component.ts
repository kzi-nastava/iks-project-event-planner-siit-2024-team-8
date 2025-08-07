import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import {Router} from '@angular/router';
import {AuthService} from '../infrastructure/auth/auth.service';
import {EventInfoResponse} from '../event/domain/EventInfoResponse';
import {EventService} from '../services/event-service';
import {ToastService} from '../services/toast-service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  public constructor(
    private router: Router,
    private authService: AuthService,
    private eventService: EventService,
    private toastService: ToastService
  ) {}

  userId: string = '';
  fetchedEvents: EventInfoResponse[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    timeZone: 'local', // Use the local timezone or 'UTC' if needed
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [] // Initialize as an empty array, to be populated after fetching
  };

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.eventService.fetchUserEvents(this.userId).subscribe({
      next: (events) => {
        this.fetchedEvents = events;

        // Map fetched events to FullCalendar's format and update options
        this.calendarOptions.events = this.fetchedEvents.map((event) => ({
          title: event.name,
          start: this.getStartDate(event.startDate),
          end: event.endDate ? this.getEndDate(event.endDate) : this.getStartDate(event.startDate),
          id: event.id,
          description: event.description,
          allDay: true, // Mark as an all-day event if you don't have time information
        }));
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      }
    });
  }

  // Helper function to standardize event start date
  getStartDate(startDate: string): string {
    // Assuming startDate is an ISO string, we handle it as an all-day event (no time)
    return new Date(startDate).toISOString().split('T')[0]; // Only the date part
  }

  // Helper function to standardize event end date (if provided)
  getEndDate(endDate: string): string {
    // If endDate is available, we handle it similarly to start date
    return new Date(endDate).toISOString().split('T')[0]; // Only the date part
  }

  handleDateClick(arg: DateClickArg) {
    const clickedDate = arg.date.toISOString().split('T')[0]; // Format the clicked date to 'YYYY-MM-DD'

    // Find all events that start or overlap on the clicked date
    const eventsForTheDay = this.fetchedEvents.filter((event) => {
      const eventStart = this.getStartDate(event.startDate);
      const eventEnd = this.getEndDate(event.endDate) || eventStart;

      return clickedDate == eventStart || (clickedDate >= eventStart && clickedDate <= eventEnd);
    });

    // Open each event in a new tab
    eventsForTheDay.forEach((event) => {
      const eventUrl = `/event/${event.id}`;
      window.open(eventUrl, '_blank');
    });

    // Show a message if no events are found on the selected date
    if (eventsForTheDay.length == 0) {
      this.toastService.showToast({
        message: 'No events on the selected date!',
        title: 'Epic fail',
        type: 'error',
        duration: 3000,
      });
    }
  }
}
