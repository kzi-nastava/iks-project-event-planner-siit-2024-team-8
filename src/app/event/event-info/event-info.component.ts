import { Component } from '@angular/core';
import {Event} from '../../model/event';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/event-service';
import {EventInfoResponse} from '../domain/EventInfoResponse';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent {
  event: EventInfoResponse;
  eventID: string;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventID = (params.get('id'));
    });

    this.eventService.getEventById(this.eventID).subscribe({
      next: (event: EventInfoResponse) => {
        this.event = event;
      }
    });
  }

  /*
  currentImageIndex = 0;

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.event.images.length) % this.event.images.length;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.event.images.length;
  }*/

  openDeleteDialog() {

  }

  navigateToEditEvent() {

  }

  openMap() {

  }
}
