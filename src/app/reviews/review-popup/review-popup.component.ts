import { Component, Inject } from '@angular/core';
import {ReviewService} from '../../services/review-service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-review-popup',
  templateUrl: './review-popup.component.html',
  styleUrls: ['./review-popup.component.css']
})
export class ReviewPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ReviewPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reviewId: string, comment: string, rating: number },
    private reviewService: ReviewService
  ) {}

  approveReview(): void {
    this.reviewService.approveReview(this.data.reviewId).subscribe(
      () => {
        console.log('Review approved');
        this.dialogRef.close(true); // Close the dialog and return success
      },
      error => {
        console.error('Error approving review', error);
      }
    );
  }

  denyReview(): void {
    this.reviewService.denyReview(this.data.reviewId).subscribe(
      () => {
        console.log('Review denied');
        this.dialogRef.close(false); // Close the dialog and return failure
      },
      error => {
        console.error('Error denying review', error);
      }
    );
  }
}
