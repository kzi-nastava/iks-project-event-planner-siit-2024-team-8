import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../env/environment';
import {PagedResponse} from '../shared/model/paged.response';
import {ReportResponse} from '../model/report';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {}

  getReports(pageProperties?: any): Observable<PagedResponse<ReportResponse>> {
    let params = new HttpParams();
    if (pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.pageSize);
    }
    return this.http.get<PagedResponse<ReportResponse>>(`${environment.apiHost}/reports`, {params: params});
  }
}
