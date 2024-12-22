import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event-service';
import {EventUpdateRequest} from '../domain/EventUpdateRequest';
import {
  VerificationEmailDialogComponent
} from '../../dialogs/verification-email-dialog/verification-email-dialog.component';
import {ErrorCodeDialogComponent} from '../../dialogs/error-code-dialog/error-code-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {
  DeleteConfirmationDialogComponent
} from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {EventInfoResponse} from '../domain/EventInfoResponse';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent {
  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService, private dialog: MatDialog) {}

  eventUpdateRequest: EventUpdateRequest;
  eventInfoResponse: EventInfoResponse;


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventService.getEventById(params.get('id')).subscribe({
        next: (event: EventInfoResponse) => {
          this.eventInfoResponse = event;
        }
      });
    });

    //TODO - load data into fields
  }


  onClickSubmit() {

    //TODO - put data from fields into eventUpdateRequest

    this.eventService.updateEvent(this.eventUpdateRequest).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/home']);
      }
    });
  }
  onClickDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.eventService.deleteEvent(this.eventUpdateRequest.id).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/home']);
          }
        })
      }
    });
  }
  onClickBack() {
    this.router.navigate(['/home']);
  }
}
