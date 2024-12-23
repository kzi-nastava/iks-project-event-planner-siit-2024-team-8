import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Invitation} from '../domain/invitation';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {ToastService} from '../../services/toast-service';

@Component({
  selector: 'app-guest-edit-card',
  templateUrl: './guest-edit-card.component.html',
  styleUrl: './guest-edit-card.component.css'
})
export class GuestEditCardComponent {
  @Input()
  guest : Invitation;

  @Output()
  clicked: EventEmitter<Invitation> = new EventEmitter();
  @Output()
  delete: EventEmitter<number> = new EventEmitter();

  constructor(private toastService : ToastService) { }

  onSaveGuestClick() {
    if (this.guest.email!="") {
      this.guest.isInput = false;
      this.clicked.emit(this.guest);
    }else{
      this.toastService.showToast({
        message: 'You must enter a guest email!',
        title: 'Error',
        type: 'error',
        duration: 3000,
      });
    }
  }

  onDeleteGuestClick() {
    this.delete.emit(this.guest.index);
  }
}
