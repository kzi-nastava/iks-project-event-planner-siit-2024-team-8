import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventDTO} from '../event/domain/EventDTO.model';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.css'
})
export class HomeCardComponent {
  @Input()
  event : EventDTO;

  @Output()
  clicked : EventEmitter<EventDTO> = new EventEmitter<EventDTO>();

  favourite : boolean = false;

  onEventClicked() : void {
    this.clicked.emit(this.event)
  }

  protected readonly toString = toString;

  onFavouriteClicked() : void {
    this.favourite = !this.favourite;
  }
}
