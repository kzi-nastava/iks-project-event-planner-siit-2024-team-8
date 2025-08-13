import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {EventInfoResponse} from '../event/domain/EventInfoResponse';
import {EventService} from '../services/event-service';

@Component({
  selector: 'app-all-publics',
  templateUrl: './all-publics.component.html',
  styleUrl: './all-publics.component.css'
})
export class AllPublicsComponent {
  events: EventInfoResponse[]
  constructor(private router: Router, private eventService: EventService) {}
  ngOnInit() {
    this.eventService.getPublics().subscribe((eventz: EventInfoResponse[]) => {
      this.events = eventz;
    })
  }
  onEventClick(event : EventInfoResponse) {
    this.eventService.chartReviews(event.id).subscribe({
      next: (response: Blob) => {
        // Create a URL for the Blob object (PDF)
        const pdfUrl = URL.createObjectURL(response);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'event-stats.pdf'; // Set the default file name
        link.click(); // Trigger the download

        // Clean up the URL object after the download starts
        URL.revokeObjectURL(pdfUrl);
      },
      error: (err) => {
        console.error('Error fetching event stats:', err);
      }
    });
  }
}
