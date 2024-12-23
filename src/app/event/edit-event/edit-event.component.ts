import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event-service';
import { EventUpdateRequest } from '../domain/EventUpdateRequest';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EventInfoResponse } from '../domain/EventInfoResponse';
import { GeocodingService } from '../../services/geocoding-service';
import {ErrorCodeDialogComponent} from '../../dialogs/error-code-dialog/error-code-dialog.component';
import {ToastService} from '../../services/toast-service'; // Import the Location interface

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private dialog: MatDialog,
    private geocodingService: GeocodingService,
    private toastService: ToastService,
  ) {}

  eventUpdateRequest: EventUpdateRequest = { // Initialize eventUpdateRequest with default values
    id: '',
    name: '',
    description: '',
    location: {id: '', latitude: 0, longitude: 0, city: '', street: '' }, // Initialize location object
    capacity: 0,
    startDate: '',
    endDate: ''
  };

  eventId: string;
  name: string = '';
  organizer: string = '';
  desc: string = '';
  cap: number = 0;
  startDate: string;
  endDate: string;
  city: string = '';
  street: string = '';
  latitude: number = 0;
  longitude: number = 0;
  locId: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventService.getEventById(params.get('id')).subscribe({
        next: (event: EventInfoResponse) => {
          this.eventId = event.id;
          this.name = event.name;
          this.desc = event.description;
          this.cap = event.capacity;
          this.organizer = event.organizerName;
          this.startDate = event.startDate;
          this.endDate = event.endDate;
          this.city = event.location.city;
          this.street = event.location.street;
          this.locId = event.location.id;
        }
      });
    });
  }

  onClickSubmit() {
    this.eventUpdateRequest.name = this.name;
    this.eventUpdateRequest.description = this.desc;
    this.eventUpdateRequest.capacity = this.cap;
    this.eventUpdateRequest.startDate = this.startDate;
    this.eventUpdateRequest.endDate = this.endDate;

    // Resolve the address to geolocation coordinates
    const address = `${this.city}, ${this.street}`;
    this.geocodingService.getCoordinates(address).subscribe((data) => {
      if (data && data.length > 0) {
        const geoData = data[0];
        this.latitude = parseFloat(geoData.lat);
        this.longitude = parseFloat(geoData.lon);
      }
    });

    // Update the location within the eventUpdateRequest object
    this.eventUpdateRequest.location = {
      id: this.locId,
      latitude: this.latitude,
      longitude: this.longitude,
      city: this.city,
      street: this.street
    };

    // Set the eventId into the eventUpdateRequest before making the API call
    this.eventUpdateRequest.id = this.eventId;
    console.log(this.eventUpdateRequest); // This will log the updated event object

    this.eventService.updateEvent(this.eventUpdateRequest).subscribe({
      next: (response) => {
        console.log(response)
        this.router.navigate(['/home']).then(() => {
          this.toastService.showToast({
            message: 'Successfully updated event!',
            title: 'Success',
            type: 'success',
            duration: 3000,
          });
        });
      }
    })
  }

  onClickDelete() {
    /*const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.eventService.deleteEvent(this.eventUpdateRequest.id).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/home']).then(() => {alert("Update successful!");});
          },
          error: (error) => {
            this.dialog.open(ErrorCodeDialogComponent, {
              data: { errorCode: error.status },
            });
          },
        });
      }
    });*/
    alert("TODO")
  }

  onClickBack() {
    this.router.navigate(['/home']);
  }
}
