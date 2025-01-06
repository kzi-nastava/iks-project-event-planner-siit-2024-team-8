import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventService} from '../../services/event-service';

@Component({
  selector: 'app-guest-event-info',
  templateUrl: './guest-event-info.component.html',
  styleUrl: './guest-event-info.component.css'
})
export class GuestEventInfoComponent {
  @Input()
  id: string;

  @Output()
  closed: EventEmitter<boolean> = new EventEmitter();

  guests : string[];

  constructor(private eventService : EventService) {
  }

  ngOnInit() {
    this.eventService.getEventGuests(this.id).subscribe((response : string[]) => {
      this.guests = response;
    })
  }

  closeClicked() {
    this.closed.emit(true);
  }
}
