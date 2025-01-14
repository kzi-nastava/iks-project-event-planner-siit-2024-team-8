import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../model/review'

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://localhost:8080/api/reviews';

  constructor(private http: HttpClient) {}

  getPendingReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/pending`);
  }

  approveReview(reviewId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reviewId}/approve`, {});
  }

  denyReview(reviewId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reviewId}/deny`, {});
  }

  getActiveReviewsForEvent(eventId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/${eventId}/event`);
  }

  getActiveReviewsForAsset(assetId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/${assetId}/asset`);
  }
}
