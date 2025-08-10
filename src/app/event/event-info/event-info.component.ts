import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/event-service';
import {EventInfoResponse} from '../domain/EventInfoResponse';
import {Router} from '@angular/router';
import {EventSignupRequest} from '../domain/EventSignupRequest';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {ToastService} from '../../services/toast-service';
import {Review} from '../../model/review';
import {ReviewService} from '../../services/review-service';
import {UserService} from '../../user/user-service';

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
  isChatVisible:  boolean = false;
  hoveredRating: number = -1;

  alreadySignedUp: boolean = false;
  isFavorite: boolean = false;
  //review
  reviews: Review[] = [];
  showComments: boolean = false;
  userComment: string = '';
  userRating: number = 0;
  stars: number[] = [0, 1, 2, 3, 4];
  userId: string;
  organizerId: string;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router,
              private authService: AuthService, private toastService: ToastService,
              private reviewService: ReviewService, private userService: UserService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Get event ID from route parameters
      this.eventID = params.get('id');

      if (!this.eventID) {
        console.error('No event ID found in route parameters');
        return;
      }

      // Get user ID once
      this.userId = this.authService.getUserId();

      // Construct event signup request
      this.eventSignupRequest = {
        eventId: this.eventID,
        userId: this.userId
      };

      // Check if user is signed up
      this.eventService.isUserSignedUp(this.eventSignupRequest).subscribe({
        next: (isSignedUp: boolean) => {
          this.alreadySignedUp = isSignedUp;
        },
        error: (err) => {
          console.error('Error checking signup status:', err);
        }
      });

      // Check if event is favorited by user
      this.userService.checkFavorite(this.userId, this.eventID).subscribe({
        next: (isFavorite: boolean) => {
          this.isFavorite = isFavorite;
        },
        error: (err) => {
          console.error('Error checking favorite status:', err);
        }
      });

      // Get event details
      this.eventService.getEventById(this.eventID).subscribe({
        next: (event: EventInfoResponse) => {
          this.event = event;
          this.organizerId = event.organizerID;
          console.log(this.event);
        },
        error: (err) => {
          console.error('Error loading event:', err);
        }
      });
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
    this.locationClicked = false;
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

  eventDateValid() : boolean {
    if (this.event.startDate && this.event.endDate) {

      const currentDate = new Date();

      const startDate = new Date(this.event.startDate);
      const endDate = new Date(this.event.endDate);

      if (currentDate >= startDate && currentDate <= endDate) {
        return false
      }
      else if (currentDate > endDate) {
        return false;
      }
      return true;
    }
    return false;
  }

  getAgenda() {
    this.eventService.fetchEventAgenda(this.eventID).subscribe({
      next: (response: Blob) => {
        // Create a URL for the Blob object (PDF)
        const pdfUrl = URL.createObjectURL(response);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'event-agenda.pdf'; // Set the default file name
        link.click(); // Trigger the download

        // Clean up the URL object after the download starts
        URL.revokeObjectURL(pdfUrl);
      },
      error: (err) => {
        console.error('Error fetching event agenda:', err);
      }
    });
  }

  getGuestlist() {
    this.eventService.fetchGuestlist(this.eventID).subscribe({
      next: (response: Blob) => {
        // Create a URL for the Blob object (PDF)
        const pdfUrl = URL.createObjectURL(response);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'event-guestlist.pdf'; // Set the default file name
        link.click(); // Trigger the download

        // Clean up the URL object after the download starts
        URL.revokeObjectURL(pdfUrl);
      },
      error: (err) => {
        console.error('Error fetching event agenda:', err);
      }
    });
  }

  loadComments() {
    this.showComments = !this.showComments;

    if (this.showComments && this.eventID) {
      this.reviewService.getActiveReviewsForEvent(this.eventID).subscribe({
        next: (reviews: Review[]) => {
          this.reviews = reviews;
        },
        error: (err: any) => {
          console.error('Error loading reviews:', err);
        }
      });
    }
  }

  setRating(stars: number) {
    this.userRating = stars;
  }

  submitRating() {
    if (!this.userComment.trim()) {
      this.toastService.showToast({
        message: 'Please enter a comment before submitting.',
        title: 'Error',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    const reviewData = {
      eventId: this.eventID,
      userId: this.authService.getUserId(),
      comment: this.userComment,
      rating: this.userRating,
    };

    this.eventService.submitReview(this.eventID, reviewData).subscribe({
      next: () => {
        this.toastService.showToast({
          message: 'Thank you for your feedback!',
          title: 'Success',
          type: 'success',
          duration: 3000,
        });

        this.userComment = '';
        this.userRating = 0;
      },
      error: (err) => {
        console.error('Error submitting rating:', err);

        if (err.status === 400 && err.error.message === 'You have already submitted a review for this event') {
          this.toastService.showToast({
            message: 'You have already submitted a review for this event.',
            title: 'Error',
            type: 'error',
            duration: 3000,
          });
        } else {
          this.toastService.showToast({
            message: 'Failed to submit your feedback. Please try again later.',
            title: 'Error',
            type: 'error',
            duration: 3000,
          });
        }
      },
    });
  }

  chatWithOrganizer() {
    this.isChatVisible = true;
  }

  closeChat() {
    this.isChatVisible = false;
  }

  favEvent() {
    this.isFavorite = true;
    this.userService.addToFavs(this.userId, this.eventID).subscribe();
  }
  unfavEvent() {
    this.isFavorite = false;
    this.userService.unaddToFavs(this.userId, this.eventID).subscribe();
  }

  protected readonly localStorage = localStorage;
}
