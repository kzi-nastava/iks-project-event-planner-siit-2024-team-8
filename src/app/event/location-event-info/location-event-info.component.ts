import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocationDTO} from '../domain/EventUpdateRequest';
import {Location} from '../../event/domain/location';

@Component({
  selector: 'app-location-event-info',
  templateUrl: './location-event-info.component.html',
  styleUrl: './location-event-info.component.css'
})
export class LocationEventInfoComponent {
    @Input()
    location: LocationDTO;

    @Output()
    closed: EventEmitter<boolean> = new EventEmitter();

  onCloseClick() {
    this.closed.emit(true);
  }
}
