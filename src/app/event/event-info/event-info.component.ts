import { Component } from '@angular/core';
import {Event} from '../../model/event';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../event.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent {
  event: Event;
  eventID: string;


  constructor(private route: ActivatedRoute,private eventService: EventService) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventID = (params.get('id'));
    });

    this.event = this.eventService.get(parseInt(this.eventID));
  }
  currentImageIndex = 0;

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.event.images.length) % this.event.images.length;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.event.images.length;
  }

  openDeleteDialog() {

  }

  navigateToEditEvent() {

  }
}
