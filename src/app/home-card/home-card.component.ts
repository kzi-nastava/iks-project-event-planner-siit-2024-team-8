import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from '../model/event';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.css'
})
export class HomeCardComponent {
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
