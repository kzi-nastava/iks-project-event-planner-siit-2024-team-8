import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event-service';
import {MatDialog} from '@angular/material/dialog';
import {ToastService} from '../../services/toast-service';
import {GuestlistUpdateRequest} from '../domain/GuestlistUpdateRequest';
import {GuestResponse} from '../../user/domain/guest-response';
import {ErrorCodeDialogComponent} from '../../dialogs/error-code-dialog/error-code-dialog.component';

@Component({
  selector: 'app-guestlist-edit',
  templateUrl: './guestlist-edit.component.html',
  styleUrl: './guestlist-edit.component.css'
})
export class GuestlistEditComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private dialog: MatDialog,
    private toastService: ToastService,
  ) {
  }

  guestlistUpdateRequest: GuestlistUpdateRequest = {
    userIds: null
  };
  eventId: string;
  responses: GuestResponse[];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.eventId = id;

      this.eventService.fetchGuests(id).subscribe({
        next: (responses: GuestResponse[]) => {
          this.responses = responses;
          console.log('Guestlist loaded:', this.responses);
        }
      });
    });
  }

  onEject(selectedOptions: any[]) {
    const selectedUserIds = selectedOptions.map(option => option.value);
    this.guestlistUpdateRequest.userIds = selectedUserIds;
    console.log('Marked for removal:', selectedUserIds);
    this.eventService.updateGuestlist(this.eventId, this.guestlistUpdateRequest).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/home']).then(() => {this.toastService.showToast({
          message: 'Guestlist successfully edited!',
          title: 'Success',
          type: 'success',
          duration: 3000,
        })});
      },
      error: (error) => {
        this.dialog.open(ErrorCodeDialogComponent, {
          data: { errorCode: error.status },
        });
      }
    })
  }

  onBack() {
    this.router.navigate([`/edit-event/${this.eventId}`]);
  }

}
