import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Invitation} from '../domain/invitation';

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.component.html',
  styleUrl: './guest-card.component.css'
})
export class GuestCardComponent {

  @Input()
  invitation : Invitation;

  @Output()
  clicked: EventEmitter<Invitation> = new EventEmitter();

  onInvitationClick() {
    this.invitation.isInput = true;
    this.clicked.emit(this.invitation);
  }
}
