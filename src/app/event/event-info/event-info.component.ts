import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/event-service';
import {EventInfoResponse} from '../domain/EventInfoResponse';
import {Router} from '@angular/router';
import {EventSignupRequest} from '../domain/EventSignupRequest';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {ToastService} from '../../services/toast-service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent {
  event: EventInfoResponse;
  eventSignupRequest: EventSignupRequest;

  eventID: string;
  budgetClicked:  boolean = false;
  guestClicked: boolean = false;
  locationClicked:  boolean = false;

  alreadySignedUp: boolean = false;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router,
              private authService: AuthService, private toastService: ToastService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Get event ID from route parameters
      this.eventID = params.get('id');

      // Construct event signup request
      this.eventSignupRequest = {
        eventId: this.eventID,
        userId: this.authService.getUserId()
      };

      // Use `isUserSignedUp` Observable properly
      this.eventService.isUserSignedUp(this.eventSignupRequest).subscribe({
        next: (isSignedUp: boolean) => {
          this.alreadySignedUp = isSignedUp; // Assign the boolean value to `alreadySignedUp`
        },
        error: (err) => {
          console.error('Error checking signup status:', err);
        }
      });

      // Load event details if event ID is present
      if (this.eventID) {
        this.eventService.getEventById(this.eventID).subscribe({
          next: (event: EventInfoResponse) => {
            this.event = event; // Assign the event details
            console.log(this.event);
          },
          error: (err) => {
            console.error('Error loading event:', err);
          }
        });
      }
    });
  }


  navigateToEditEvent() {
    this.router.navigate([`/edit-event/${this.eventID}`]);
  }

  openMap() {
    console.log('Opening Map');
    this.locationClicked = true;
    this.budgetClicked = false;
    this.guestClicked = false;
  }

  navigateToBudget() {
    this.budgetClicked = true;
    this.guestClicked = false;
  }

  isMyEvent() {
    return this.event.organizerID == localStorage.getItem("userID");
  }

  eventSignup() {
    this.eventService.signupUserToEvent(this.eventSignupRequest).subscribe({
      next: (response: string) => {
        this.router.navigate(['/home']);
        this.toastService.showToast({
          message: 'Successfully joined event!',
          title: 'Success',
          type: 'success',
          duration: 3000,
        });
      },
      error: (err) => {
        console.log(err);
        this.toastService.showToast({
          message: 'the event is full or you already signed up for it',
          title: 'Fail',
          type: 'error',
          duration: 3000,
        });
      }
    });
  }

  leaveEvent() {
    this.eventService.leaveEvent(this.eventSignupRequest).subscribe({
      next: (response: string) => {
        this.router.navigate(['/home']);
        this.toastService.showToast({
          message: response,
          title: 'Success',
          type: 'success',
          duration: 3000,
        });
      },
      error: (err) => {
        console.log(err);
        this.toastService.showToast({
          message: 'Internal server error; try again later.',
          title: 'Fail',
          type: 'error',
          duration: 3000,
        });
      }
    })
  }
}
