import { Component } from '@angular/core';
import {Activity, returnActivity} from '../domain/activity';
import {EventType} from '../domain/event.type';
import {Invitation, returnInvitation} from '../domain/invitation';
import {GeocodingService} from '../../services/geocoding-service';
import {Location, returnLocation} from '../domain/location'
import {ToastService} from '../../services/toast-service';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  imageUrl: "https://via.placeholder.com/150"; // Default placeholder image
  selectedFile: File | null = null;
  imageSelected: boolean = false;

  activities : Activity[] = [];
  eventTypes: EventType[] = [];
  guests: Array<Invitation>= [];
  guestId: number = 1;

  error : string = "";
  location : Location;
  locationSelected: boolean = false;

  isPrivate: boolean = false;

  ngOnInit(): void {
    this.location = returnLocation();
  }
  constructor(private geocodingService: GeocodingService,private toastService: ToastService) {
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
    this.activities.push(returnActivity());
  }
  onActivitySaved(savedActivity: Activity): void {
    this.activities.pop();
    this.activities.push(savedActivity);
    console.log('Activity added to list:', savedActivity);
  }

  onAddGuestClick() {
    this.guests.push(returnInvitation(this.guestId))
    console.log("guests:" , this.guests);
    this.guestId++;
  }

  onSaveInvitationClick($event: Invitation) {
    this.guests = this.guests.filter(guest => guest.id !== $event.id);
    this.guests.push($event);
  }

}
