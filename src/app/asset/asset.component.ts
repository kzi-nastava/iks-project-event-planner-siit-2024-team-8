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
  categoryName: string = '';

  images: string[] = ['https://via.placeholder.com/800x500.png?text=Default+Image'];
  currentImageIndex: number = 0;

  utilityDuration: number;
  utilityReservationTerm: string;
  utilityCancellationTerm: string;
  utilityManualConfirmation: boolean;

  boughtAsset: boolean = false;
  //review
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
  ) {}

  ngOnInit(): void {
    this.authService.userState.subscribe(user => {
      this.role = user;

      this.userService.getUserInfo().subscribe(data => {
        this.currentUser = data;

        this.route.paramMap.subscribe(params => {
          this.assetID = params.get('id');
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

    if (url.includes('utilities')) {
      this.isUtility = true;
      this.isProduct = false;
      this.utilityService.getUtilityById(this.assetID).subscribe(
          (utility) => {
            this.asset = utility;
            this.images = utility.images || this.images;

            this.utilityDuration = utility.duration;
            this.utilityReservationTerm = utility.reservationTerm;
            this.utilityCancellationTerm = utility.cancellationTerm;
            this.utilityManualConfirmation = utility.manuelConfirmation;

            if (utility.category) {
              this.fetchCategory(utility.category);
            }
          },
          (error) => console.error('Error fetching utility:', error)
      );
    } else if (url.includes('products')) {
      this.isProduct = true;
      this.isUtility = false;
      this.productService.getProductById(this.assetID).subscribe(
          (product) => {
            this.asset = product;
            this.images = product.images || this.images;

            if (product.category) {
              this.fetchCategory(product.category);
            }
          },
          (error) => console.error('Error fetching product:', error)
      );
    }
  }

  checkIfAssetBought(): void {
    if (!this.currentUser || !this.assetID) {
      return;
    }

    this.eventService.checkAssetInOrganizedEvents(this.authService.getUserId(), this.assetID).subscribe({
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
    if (this.isUtility) {
        this.utilityService.deleteUtility(this.assetID).subscribe()
    } else {
        this.productService.deleteProduct(this.assetID).subscribe()
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
      userId: this.authService.getUserId(),
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
}
