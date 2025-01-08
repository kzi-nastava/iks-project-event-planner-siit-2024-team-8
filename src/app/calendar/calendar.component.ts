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
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  public constructor(private router: Router, private authService: AuthService, private eventService: EventService, private toastService: ToastService) {}

  userId: string = "";
  fetchedEvents: EventInfoResponse[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [] // Initialize as an empty array
  };

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.eventService.fetchUserEvents(this.userId).subscribe({
      next: events => {
        this.fetchedEvents = events;

        // Map fetched events to FullCalendar's format and update options
        this.calendarOptions.events = this.fetchedEvents.map(event => ({
          title: event.name,
          start: event.startDate, // Adjust according to your API response structure
          end: event.endDate,
          id: event.id,
          description: event.description // Additional info, if available
        }));
      },
      error: err => {
        console.error('Error fetching events:', err);
      }
    });
  }

  handleDateClick(arg: DateClickArg) {
    // Find all events that start or overlap on the clicked date
    const eventsForTheDay = this.fetchedEvents.filter(event => {
      const eventStart = new Date(event.startDate).toISOString().split('T')[0];
      const eventEnd = event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : eventStart;
      const clickedDate = arg.date.toISOString().split('T')[0];

      return clickedDate >= eventStart && clickedDate <= eventEnd;
    });

    // Open each event in a new tab
    eventsForTheDay.forEach(event => {
      const eventUrl = `/event/${event.id}`;
      window.open(eventUrl, '_blank');
    });

    if (eventsForTheDay.length === 0) {
      this.toastService.showToast({
        message: 'No events on the selected date!',
        title: 'Epic fail',
        type: 'error',
        duration: 3000,
      });
    }
  }
}
