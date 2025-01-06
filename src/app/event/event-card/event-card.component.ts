import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from '../../model/event';
import {EventInfoResponse} from '../domain/EventInfoResponse';
import {EventCardResponse} from '../domain/event.card.response';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input()
  event : EventCardResponse;

  @Output()
  clicked : EventEmitter<EventCardResponse> = new EventEmitter<EventCardResponse>();

  favourite : boolean = false;

  onEventClicked() : void {
    this.clicked.emit(this.event)
  }

  protected readonly toString = toString;

  onFavouriteClicked() : void {
    this.favourite = !this.favourite;
  }
}
