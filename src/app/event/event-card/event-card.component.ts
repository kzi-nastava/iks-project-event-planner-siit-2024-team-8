import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from '../../model/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input()
  event : Event;

  @Output()
  clicked : EventEmitter<Event> = new EventEmitter<Event>();

  favourite : boolean = false;

  onEventClicked() : void {
    this.clicked.emit(this.event)
  }

  protected readonly toString = toString;

  onFavouriteClicked() : void {
    this.favourite = !this.favourite;
  }
}
