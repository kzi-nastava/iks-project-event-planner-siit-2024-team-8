import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../env/environment';
import {Budget} from '../event/domain/budget';
import {BudgetItem} from '../event/domain/budgetItem';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private apiUrl = '/event/budget/';

  constructor(private http: HttpClient) {}

  getBudgetByEventId(id: string): Observable<Budget> {
    return this.http.get<Budget>(`${environment.apiHost}${this.apiUrl}${id}`);
  }

  updateBudgetItem(budgetItemId: string, plannedAmount: number): Observable<BudgetItem> {
    const params = new HttpParams().set('plannedAmount', plannedAmount.toString());
    return this.http.put<BudgetItem>(
      `${environment.apiHost}${this.apiUrl}item/${budgetItemId}`,
      null,
      { params }
    );
  }

  addBudgetItem(budgetId: string, budgetItemCreateRequest: BudgetItem): Observable<BudgetItem> {
    return this.http.post<BudgetItem>(
      `${environment.apiHost}${this.apiUrl}item/${budgetId}`,
      budgetItemCreateRequest
    );
  }

  deleteBudgetItem(budgetItemId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiHost}${this.apiUrl}item/${budgetItemId}`);
  }

  buyProduct(eventId: string, productId: string): Observable<BudgetItem> {
    return this.http.post<BudgetItem>(
      `${environment.apiHost}${this.apiUrl}${eventId}/buy-product/${productId}`,
      null
    );
  }

  reserveUtility(eventId: string, utilityId: string): Observable<BudgetItem> {
    return this.http.post<BudgetItem>(
      `${environment.apiHost}${this.apiUrl}${eventId}/reserve-utility/${utilityId}`,
      null
    );
  }

  cancelUtilityReservation(eventId: string, utilityVersionId: string): Observable<void> {
    return this.http.put<void>(
      `${environment.apiHost}${this.apiUrl}${eventId}/cancel-utility/${utilityVersionId}`,
      null
    );
  }

  acceptReservation(reservationId: string): Observable<void> {
    return this.http.put<void>(
      `${environment.apiHost}${this.apiUrl}accept-reservation/${reservationId}`,
      {}
    );
  }

  denyReservation(reservationId: string): Observable<void> {
    return this.http.put<void>(
      `${environment.apiHost}${this.apiUrl}deny-reservation/${reservationId}`,
      {}
    );
  }
}
