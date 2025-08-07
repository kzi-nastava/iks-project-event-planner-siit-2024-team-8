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
import { AssetCategory } from '../../model/asset-category';
import {BudgetItem} from '../domain/budgetItem';
import {Router} from '@angular/router';
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
  budgetItems: BudgetItem[] = [];

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
              private fb: FormBuilder,
              private router: Router,) {
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
    const isBudgetValid = this.SaveBudget();
    if (!isBudgetValid) {
      return;
    }
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
    this.event.budgetItems = this.budgetItems;

    console.log(this.event);

    this.eventService.createEvent(this.event).subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        this.router.navigate(['/home']).then(() => {
          this.router.navigate(['/home']).then(() => {this.toastService.showToast({
            message: 'Successfully created event!',
            title: 'Success',
            type: 'success',
            duration: 3000,
          })});
        });
      },
      error: (error) => {
        this.toastService.showErrorToast(error.message);
      },
    });
  }

  isBudgetValid() {
    return this.budgetItems.every(
      (item) =>
        item.assetCategoryId !== null &&
        item.assetCategoryId !== '' &&
        item.plannedAmount >= 0
    ) || this.budgetItems.length === 0;
  }

  addNewBudgetItem() {
    const newBudgetItem: BudgetItem = {
      id: '',
      assetCategoryId: '',
      plannedAmount: 0,
      actualAmount: 0,
      assetVersionIds: [],
      deleted: false,
    };
    this.budgetItems.push(newBudgetItem);
  }

  onDeleteBudgetItem(itemId: String): void {
    this.budgetItems = this.budgetItems.filter(item => item.id !== itemId);
  }

  onSuggestedBudgetClick(): void {
    this.budgetItems = [];

    const selectedEventType: EventType = this.stepFormOne.value['eventType'];
    console.log("event types suggest cats: ", selectedEventType.assetCategories)

    if (selectedEventType && selectedEventType.assetCategories) {
      selectedEventType.assetCategories.forEach((category: AssetCategory) => {
        const newBudgetItem: BudgetItem = {
          id: '',
          assetCategoryId: category.id,
          plannedAmount: 0,
          actualAmount: 0,
          assetVersionIds: [],
          deleted: false,
        };
        this.budgetItems.push(newBudgetItem);
      });
    }
  }

  SaveBudget(): boolean {
    if (!this.isBudgetValid()) {
      return false;
    }

    const categoryIds = this.budgetItems.map(item => item.assetCategoryId);
    const duplicateCategories = categoryIds.filter((item, index) => categoryIds.indexOf(item) !== index);

    if (duplicateCategories.length > 0) {
      this.toastService.showToast({
        message: 'There are duplicate budget items with the same category.',
        title: 'Duplicate Category Error',
        type: 'error',
        duration: 3000,
      });
      return false;
    }

    return true;
  }
}
