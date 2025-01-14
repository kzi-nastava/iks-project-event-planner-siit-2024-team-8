import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Review } from '../model/review';
import { ReviewService } from '../services/review-service';
import { ReviewPopupComponent } from './review-popup/review-popup.component';  // Import the dialog component

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  pendingReviews: Review[] = [];
  pageSize = 15;
  pageIndex = 0;
  totalItems: number = 0;
  carouselIndex = 0;

  constructor(
    private reviewService: ReviewService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPendingReviews();
  }

  loadPendingReviews(): void {
    this.reviewService.getPendingReviews().subscribe(
      (data: Review[]) => {
        this.pendingReviews = data;
        this.totalItems = this.pendingReviews.length;
      },
      error => {
        console.error('Error loading pending reviews', error);
      }
    );
  }

  openReviewDialog(): void {
    const selectedReview = this.pendingReviews[this.carouselIndex];
    const dialogRef = this.dialog.open(ReviewPopupComponent, {
      width: '400px',
      data: {
        reviewId: selectedReview.id,
        comment: selectedReview.comment,
        rating: selectedReview.rating
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Review approved');
      } else {
        console.log('Review denied');
      }
      this.pendingReviews = this.pendingReviews.filter(
        review => review.id !== selectedReview.id
      );
      this.totalItems = this.pendingReviews.length;
      if (this.carouselIndex >= this.pendingReviews.length) {
        this.carouselIndex = this.pendingReviews.length - 1;
      }

      this.loadPendingReviews();
    });
  }

  navigateCarousel(direction: string): void {
    if (direction === 'left' && this.carouselIndex > 0) {
      this.carouselIndex--;
    } else if (direction === 'right' && this.carouselIndex < this.pendingReviews.length - 1) {
      this.carouselIndex++;
    }
  }

  updatePageData(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex;
    }

    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.pendingReviews = this.pendingReviews.slice(startIndex, endIndex);
  }
}
