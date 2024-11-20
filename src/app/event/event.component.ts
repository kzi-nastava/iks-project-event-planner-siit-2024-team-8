import { Component } from '@angular/core';
import { Event } from '../model/event';
import {EventService} from './event.service';
import {AssetService} from '../asset/asset.service';
import {ActivatedRoute, Route} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
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
