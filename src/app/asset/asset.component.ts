import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UtilityService } from '../services/utility-service';
import { ProductService } from '../services/product-service';
import { AssetCategoryService } from '../services/asset-category-service';
import { AssetCategory } from '../model/asset-category';
import { Asset } from '../model/asset';
import {AuthService} from '../infrastructure/auth/auth.service';
import {UserService} from '../user/user-service';
import {UserInfoResponse} from '../user/domain/user.info.response';
import {EventListPopupComponent} from './event-list-popup/event-list-popup.component';
import {BudgetService} from '../services/budget-service';
import {ToastService} from '../services/toast-service';
import {Review} from '../model/review';
import {ReviewService} from '../services/review-service';
import {EventService} from '../services/event-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  asset: Asset;
  assetID: string;
  isUtility: boolean = false;
  isProduct: boolean = false;
  isChatVisible = false;
  categoryName: string = '';
  providerName: string = '';
  providerId: string = '';
  userId: string = '';
  hoveredRating: number = -1;
  isProviderOwner: boolean = false;
  isVersionRoute: boolean = false;
  reservationDate: Date;
  eventID: string;

  images: string[] = ['https://via.placeholder.com/800x500.png?text=Default+Image'];
  currentImageIndex: number = 0;

  utilityDuration: number;
  utilityReservationTerm: string;
  utilityCancellationTerm: string;
  utilityManualConfirmation: boolean;

  boughtAsset: boolean = false;

  reviews: Review[] = [];
  showComments: boolean = false;
  userComment: string = '';
  userRating: number = 0;
  stars: number[] = [0, 1, 2, 3, 4];

  role: string = '';
  currentUser: UserInfoResponse;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private dialog: MatDialog,
      private utilityService: UtilityService,
      private productService: ProductService,
      private assetCategoryService: AssetCategoryService,
      private authService: AuthService,
      private userService: UserService,
      private budgetService: BudgetService,
      private toastService: ToastService,
      private reviewService: ReviewService,
      private eventService: EventService,
      private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId()
    this.authService.userState.subscribe(user => {
      this.role = user;

      this.userService.getUserInfo().subscribe(data => {
        this.currentUser = data;

        this.route.paramMap.subscribe(params => {

          this.assetID = params.get('id');
          this.eventID = params.get('eventId');
          if (this.assetID) {
            this.fetchAssetData();
            this.checkIfAssetBought();
          }
        });
      });
    });
  }

  fetchAssetData(): void {
    const url = this.router.url;
    this.isVersionRoute = url.includes('/version/');

    if (url.includes('utilities')) {
      this.isUtility = true;
      this.isProduct = false;

      if (this.isVersionRoute) {
        this.utilityService.getUtilityVersionById(this.assetID).subscribe(
          (utility) => this.processFetchedAsset(utility),
          (error) => console.error('Error fetching utility version:', error)
        );
      } else {
        this.utilityService.getUtilityById(this.assetID).subscribe(
          (utility) => this.processFetchedAsset(utility),
          (error) => console.error('Error fetching utility:', error)
        );
      }

    } else if (url.includes('products')) {
      this.isProduct = true;
      this.isUtility = false;

      if (this.isVersionRoute) {
        this.productService.getProductVersionById(this.assetID).subscribe(
          (product) => this.processFetchedAsset(product),
          (error) => console.error('Error fetching product version:', error)
        );
      } else {
        this.productService.getProductById(this.assetID).subscribe(
          (product) => this.processFetchedAsset(product),
          (error) => console.error('Error fetching product:', error)
        );
      }
    }
  }

  processFetchedAsset(asset: any): void {
    this.asset = asset;
    this.images = asset.images || this.images;
    this.providerId = asset.providerId;
    this.isProviderOwner = this.providerId === this.userId;

    this.userService.getUserById(this.providerId).subscribe(data => {
      if (data) {
        this.providerName = data.firstName + ' ' + data.lastName;
      }
    });

    if (asset.category) {
      this.fetchCategory(asset.category);
    }

    if (this.isUtility) {
      this.utilityDuration = asset.duration;
      this.utilityReservationTerm = asset.reservationTerm;
      this.utilityCancellationTerm = asset.cancellationTerm;
      this.utilityManualConfirmation = asset.manuelConfirmation;

      this.reservationDate = new Date(asset.reservationDate);
    }

    console.log('--- CANCEL BUTTON DEBUG ---');
    console.log('isUtility:', this.isUtility);
    console.log('isVersionRoute:', this.isVersionRoute);
    console.log('isBeforeCancellationDate():', this.isBeforeCancellationDate());
    console.log('asset.available:', this.asset?.available);
    console.log('utilityCancellationTerm:', this.utilityCancellationTerm);
  }

  isReservationInFuture(): boolean {
    return this.reservationDate && new Date(this.reservationDate) > new Date();
  }
  checkIfAssetBought(): void {
    if (!this.currentUser || !this.assetID) {
      return;
    }

    this.eventService.checkAssetInOrganizedEvents(this.userId, this.assetID).subscribe({
      next: (isBought) => {
        this.boughtAsset = isBought;
      },
      error: (err) => {
        console.error('Error checking if asset is bought:', err);
      }
    });
  }

  fetchCategory(categoryId: string): void {
    this.assetCategoryService.getCategoryById(categoryId).subscribe(
        (category: AssetCategory) => {
          this.categoryName = category.name || 'No Category';
        },
        (error) => {
          console.error('Error fetching category:', error);
          this.categoryName = 'Category not found';
        }
    );
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) this.currentImageIndex--;
  }

  nextImage(): void {
    if (this.currentImageIndex < this.images.length - 1) this.currentImageIndex++;
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteItem();
      }
    });
  }

  deleteItem(): void {
    const successMessage = 'Asset deleted successfully.';
    const errorMessage = 'Failed to delete asset. Please try again.';

    const handleResponse = {
      next: () => {
        this.snackBar.open(successMessage, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        const msg = err?.error || errorMessage;
        this.snackBar.open(msg, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    };

    if (this.isUtility) {
      this.utilityService.deleteUtility(this.assetID).subscribe(handleResponse);
    } else {
      this.productService.deleteProduct(this.assetID).subscribe(handleResponse);
    }
  }

  navigateToEditAsset(): void {
     if (this.isUtility) {
        this.router.navigate([`/assets/utilities/${this.assetID}/edit`]);
     } else if (this.isProduct) {
        this.router.navigate([`/assets/products/${this.assetID}/edit`]);
     }
    }

  buyProduct(): void {
    const dialogRef = this.dialog.open(EventListPopupComponent, {
      data: { email: this.currentUser.email },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((selectedEvent) => {
      if (selectedEvent) {
        this.budgetService.buyProduct(selectedEvent.id, this.assetID).subscribe(
          (response) => {
            console.log('Product successfully bought:', response);
          },
          (error) => {
            console.error('Error buying product:', error);
          }
        );
      }
    });
  }

  reserveUtility(): void {
    const dialogRef = this.dialog.open(EventListPopupComponent, {
      data: { email: this.currentUser.email },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((selectedEvent) => {
      if (selectedEvent) {
        this.budgetService.reserveUtility(selectedEvent.id, this.assetID).subscribe(
          (response) => {
            console.log('Utility successfully reserved:', response);
          },
          (error) => {
            console.error('Error reserving utility:', error);
          }
        );
      }
    });
  }

  loadComments() {
    this.showComments = !this.showComments;

    if (this.showComments && this.assetID) {
      this.reviewService.getActiveReviewsForAsset(this.assetID).subscribe({
        next: (reviews: Review[]) => {
          this.reviews = reviews;
        },
        error: (err) => {
          console.error('Error loading reviews:', err);
        }
      });
    }
  }

  setRating(stars: number) {
    this.userRating = stars;
    console.log("set rating to: "+ stars)
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
      assetId: this.assetID,
      userId: this.userId,
      comment: this.userComment,
      rating: this.userRating,
    };

    if (this.isProduct) {
      this.productService.submitReview(this.assetID, reviewData).subscribe({
        next: () => {
          this.toastService.showToast({
            message: 'Thank you for your feedback! \n Admin check in progress',
            title: 'Success',
            type: 'success',
            duration: 3000,
          });
          this.resetForm();
          this.showComments = false;
          this.boughtAsset = false;
        },
        error: (err) => {
          console.error('Error submitting rating:', err);
          if (err.status === 400 && err.error.message === 'You have already submitted a review for this asset') {
            this.toastService.showToast({
              message: 'You have already submitted a review for this asset.',
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
    } else if (this.isUtility) {
      this.utilityService.submitReview(this.assetID, reviewData).subscribe({
        next: () => {
          this.toastService.showToast({
            message: 'Thank you for your feedback! \n Admin check in progress',
            title: 'Success',
            type: 'success',
            duration: 3000,
          });
          this.resetForm();
          this.showComments = false;
          this.boughtAsset = false;
        },
        error: (err) => {
          console.error('Error submitting rating:', err);
          if (err.status === 400 && err.error.message === 'You have already submitted a review for this asset') {
            this.toastService.showToast({
              message: 'You have already submitted a review for this asset.',
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
  }

  private resetForm(): void {
    this.userComment = '';
    this.userRating = 0;
  }

  chatWithProvider() {
    this.isChatVisible = true;
  }

  closeChat() {
    this.isChatVisible = false;
  }

  isBeforeCancellationDate(): boolean {
    const today = new Date();

    if (!this.utilityCancellationTerm) {
      console.log('Cancellation term is missing.');
      return false;
    }

    let cancellationDate: Date;

    const parts = this.utilityCancellationTerm.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-based
      const year = parseInt(parts[2], 10);
      cancellationDate = new Date(year, month, day);
    } else {
      console.error('Invalid cancellation term format:', this.utilityCancellationTerm);
      return false;
    }

    if (isNaN(cancellationDate.getTime())) {
      console.error('Failed to parse cancellation date:', cancellationDate);
      return false;
    }

    const result = today <= cancellationDate;
    return result;
  }

  cancelReservation(): void {
    if (!this.assetID || !this.currentUser) return;

    this.budgetService.cancelUtilityReservation(this.eventID, this.assetID).subscribe({
      next: () => {
        this.toastService.showToast({
          title: 'Reservation Cancelled',
          message: 'The utility reservation has been successfully cancelled.',
          type: 'success',
          duration: 3000
        });
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error cancelling reservation:', err);
        this.toastService.showToast({
          title: 'Error',
          message: 'Failed to cancel the reservation. Please try again later.',
          type: 'error',
          duration: 3000
        });
      }
    });
  }
}
