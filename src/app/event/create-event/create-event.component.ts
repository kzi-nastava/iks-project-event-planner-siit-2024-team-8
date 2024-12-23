import {Component, ViewChild} from '@angular/core';
import {Activity, returnActivity} from '../domain/activity';
import {EventType} from '../domain/event.type';
import {Invitation, returnInvitation} from '../domain/invitation';
import {GeocodingService} from '../../services/geocoding-service';
import {Location, returnLocation} from '../domain/location'
import {ToastService} from '../../services/toast-service';
import {EventTypeService} from '../../services/event-type-service';
import {EventDTO, returnEvent} from '../domain/EventDTO.model';
import {EventService} from '../../services/event-service';
import {ApiResponse} from '../../model/api.response';
import {MatStepper} from '@angular/material/stepper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {minDateValidator} from '../../shared/custom.validators';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  imageUrl: "https://via.placeholder.com/150"; // Default placeholder image
  selectedFile: File | null = null;
  imageSelected: boolean = false;

  activities : Activity[] = [];
  eventTypes: EventType[] = [];
  guests: Array<Invitation>= [];

  error : string = "";
  location : Location;
  locationSelected: boolean = false;

  event: EventDTO;

  isPrivate: boolean = false;

  currentActivityIndex: number = 0;
  currentGuestIndex: number = 0;

  public stepFormOne : FormGroup ;
  public stepFormTwo : FormGroup;

  constructor(private geocodingService: GeocodingService,private toastService: ToastService,
              private eventTypeService: EventTypeService,
              private eventService: EventService,
              private fb: FormBuilder,) {
    this.stepFormOne = this.fb.group({
      eventType: [null, Validators.required],
      name: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      description: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required,minDateValidator()]],
      endDate: ['', [Validators.required,minDateValidator()]],
      isPrivate: [false]
    });
  }
  ngOnInit(): void {
    this.location = returnLocation();
    this.getEventTypes();
    this.event = returnEvent();
  }

  getEventTypes():void {
    this.eventTypeService.getActiveEventTypes().subscribe((eventTypes: EventType[]) => {
      this.eventTypes = eventTypes;
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Set the image source to the selected file
        this.imageSelected = true; // Enable the "Next" button
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmitLocationClick() {
    const address = `${this.location.city}, ${this.location.street}`;

    this.geocodingService.getCoordinates(address).subscribe(
      (data) => {
        if (data && data.length > 0) {
          const geoData = data[0];  // First result from Nominatim API
          this.location = {
            ...this.location,
            latitude: parseFloat(geoData.lat),
            longitude: parseFloat(geoData.lon),
          };
          this.locationSelected = true;
        } else {
          this.toastService.showToast({
            message: 'No results found for this location!',
            title: 'Location could not be found.',
            type: 'error',
            duration: 3000,
          });
          this.locationSelected = false;
          this.location = returnLocation();
        }
      },
      (err) => {
        this.toastService.showToast({
          message: 'Error',
          title: 'Error fetching location!',
          type: 'error',
          duration: 3000,
        });
        this.location = null;
      }
    );
  }

  onClickNewActivity() {
    this.activities.push(returnActivity(this.currentActivityIndex));
    this.currentActivityIndex++;
  }
  onActivitySaved(savedActivity: Activity): void {
    this.activities.pop();
    this.activities.push(savedActivity);
    console.log('Activity added to list:', savedActivity);
  }
  onDeleteActivityClicked($event: number) {
    this.activities = this.activities.filter(activity => activity.index !== $event);
  }

  onAddGuestClick() {
    this.guests.push(returnInvitation(this.currentGuestIndex))
    this.currentGuestIndex++;
  }

  onSaveInvitationClick($event: Invitation) {
    this.guests = this.guests.filter(guest => guest.index !== $event.index);
    this.guests.push($event);
  }

  onDeleteGuestClick($event:number): void {
    this.guests = this.guests.filter(guest => guest.index !== $event);
  }


  onFinishClick() {
    this.event.name = this.stepFormOne.value['name'];
    this.event.description = this.stepFormOne.value['description'];
    this.event.capacity = this.stepFormOne.value['capacity'];
    this.event.startDate = this.stepFormOne.value['startDate'];
    this.event.endDate = this.stepFormOne.value['endDate'];
    this.event.eventType = this.stepFormOne.value['eventType'];
    this.event.location = this.location;
    this.event.agenda = this.activities;
    this.event.guests = this.guests.map(guest => guest.email);
    this.event.isPrivate = this.isPrivate;
    this.event.organizerID = localStorage.getItem('userID');

    console.log(this.event);

    this.eventService.createEvent(this.event).subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
      },
      error: (error) => {
        this.toastService.showErrorToast(error.message);
      },
    });
  }

}
