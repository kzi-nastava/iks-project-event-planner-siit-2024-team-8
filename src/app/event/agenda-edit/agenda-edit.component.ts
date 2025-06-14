import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event-service';
import {MatDialog} from '@angular/material/dialog';
import {ToastService} from '../../services/toast-service';
import {AgendaUpdateRequest} from '../domain/AgendaUpdateRequest';
import {ActivityUpdateRequest} from '../domain/ActivityUpdateRequest';
import {ErrorCodeDialogComponent} from '../../dialogs/error-code-dialog/error-code-dialog.component';

@Component({
  selector: 'app-agenda-edit',
  templateUrl: './agenda-edit.component.html',
  styleUrl: './agenda-edit.component.css'
})
export class AgendaEditComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private dialog: MatDialog,
    private toastService: ToastService,
  ) {}

  agendaUpdateRequest: AgendaUpdateRequest = {
    activityUpdates: null //should be a list of ActivityUpdateRequest objects
  }
  eventId: string;
  activityInfoResponses: ActivityUpdateRequest[];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.eventId = id;

      this.eventService.fetchActivities(id).subscribe({
        next: (response: AgendaUpdateRequest) => {
          this.activityInfoResponses = response.activityUpdates;
          console.log('Guestlist loaded:', this.activityInfoResponses);
        }
      });
    });
  }

  onClickUpdate() {
    this.agendaUpdateRequest.activityUpdates = this.activityInfoResponses.map(activity => ({
      name: activity.name,
      description: activity.description,
      place: activity.place,
      startTime: activity.startTime,
      endTime: activity.endTime
    }));

    this.eventService.updateEventAgenda(this.eventId, this.agendaUpdateRequest).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/home']).then(() => {this.toastService.showToast({
          message: 'Agenda successfully edited!',
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
    });
  }

  onClickBack() {
    this.router.navigate([`/edit-event/${this.eventId}`]);
  }
}
