import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/event-service';
import {EventInfoResponse} from '../domain/EventInfoResponse';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent {
  event: EventInfoResponse;

  eventID: string;
  budgetClicked:  boolean = false;
  guestClicked: boolean = false;
  locationClicked:  boolean = false;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventID = params.get('id');
      if (this.eventID) {
        this.eventService.getEventById(this.eventID).subscribe({
          next: (event: EventInfoResponse) => {
            this.event = event;
            console.log(this.event);
          },
          error: (err) => {
            console.error('Error loading event:', err);
          }
        });
      }
    });
  }

  navigateToEditEvent() {
    this.router.navigate([`/edit-event/${this.eventID}`]);
  }

  openMap() {
    console.log('Opening Map');
    this.locationClicked = true;
    this.budgetClicked = false;
    this.guestClicked = false;
  }

  navigateToBudget() {
    this.budgetClicked = true;
    this.guestClicked = false;
  }

  isMyEvent() {
    return this.event.organizerID == localStorage.getItem("userID");
  }
}
