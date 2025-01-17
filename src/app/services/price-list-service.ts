import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PriceListItem} from '../model/price-list-item';
import {environment} from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class PriceListService {
  private apiUrl = '/price-list';

  constructor(private http: HttpClient) {}

  getPriceList(providerId: string): Observable<PriceListItem[]> {
    const params = new HttpParams().set('providerId', providerId);
    return this.http.get<any>(environment.apiHost + this.apiUrl, { params });
  }

  updatePriceAndDiscount(assetId: string, newPrice: number, newDiscount: number): Observable<void> {
    const params = new HttpParams()
      .set('newPrice', newPrice.toString())
      .set('newDiscount', newDiscount.toString());

    return this.http.put<void>(`${environment.apiHost + this.apiUrl}/${assetId}/price`, params);
  }
}
