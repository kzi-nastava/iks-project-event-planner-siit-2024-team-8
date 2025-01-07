import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import {EventInfoResponse} from '../event/domain/EventInfoResponse';
import {EventUpdateRequest} from '../event/domain/EventUpdateRequest';
import {ApiResponse} from '../model/api.response';
import {A} from '@angular/cdk/keycodes';
import {environment} from '../../env/environment';
import {EventDTO} from '../event/domain/EventDTO.model';
import {PagedResponse} from '../shared/model/paged.response';
import {SearchEventsRequest} from '../event/domain/search.events.request';
import {EventCardResponse} from '../event/domain/event.card.response';
import {EventCardComponent} from '../event/event-card/event-card.component';
import {EventSignupRequest} from '../event/domain/EventSignupRequest';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = '/events';

  constructor(private http: HttpClient) {}
  getAllEvents(pageProperties? : any): Observable<PagedResponse<EventCardResponse>> {
    let params = new HttpParams();
    if (pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.pageSize);
    }
    return this.http.get<PagedResponse<EventCardResponse>>(`${environment.apiHost + this.apiUrl}/all`,{params: params});
  }

  //helper func to date
  formatDateToLocal(date: string | Date): string {
    const parsedDate = (typeof date === 'string') ? new Date(date) : date;

    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date string provided');
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  filterEvents(request:SearchEventsRequest,pageProperties? : any): Observable<PagedResponse<EventCardResponse>> {
    let params = new HttpParams();

    if (request.startDate) {
      params = params.set('startDate', this.formatDateToLocal(request.startDate));
      console.log(this.formatDateToLocal(request.startDate));
    }
    if (request.endDate) {
      params = params.set('endDate', this.formatDateToLocal(request.endDate));
    }
    Object.entries(request).forEach(([key, value]) => {
      if (key !== 'startDate' && key !== 'endDate' && value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            params = params.append(key, item);
          });
        } else {
          params = params.set(key, value as string);
        }
      }
    });

    if (pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.pageSize);
    }

    return this.http.get<PagedResponse<EventCardResponse>>(`${environment.apiHost + this.apiUrl}/filter`, {params: params});
  }

  createEvent(event : EventDTO):Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiHost+this.apiUrl}`, event)
  }

  getEventById(id: string): Observable<EventInfoResponse> {
    return this.http.get<EventInfoResponse>(`${environment.apiHost+this.apiUrl}/${id}`);
  }

  updateEvent(eventUpdateRequest: EventUpdateRequest) :Observable<string> {
    return this.http.put(`${environment.apiHost+this.apiUrl}` + "/update", eventUpdateRequest, {responseType: 'text'});
  }

  getOrganizedEvents(email : string) : Observable<EventInfoResponse[]> {
    return this.http.get<EventInfoResponse[]>(`${environment.apiHost+this.apiUrl}/organized/${email}`);
  }

  deleteEvent(id: string): Observable<string> {
    return this.http.delete(`${environment.apiHost+this.apiUrl}/delete/${id}`, {responseType: 'text'});
  }

  getEventGuests(id:string) : Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiHost+this.apiUrl}/guests/${id}`)
  }

  signupUserToEvent(eventSignupRequest: EventSignupRequest) : Observable<string> {
    return this.http.put(`${environment.apiHost+this.apiUrl}/signup`, eventSignupRequest, {responseType: 'text'});
  }

  isUserSignedUp(eventSignupRequest: EventSignupRequest): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiHost + this.apiUrl}/already`, eventSignupRequest);
  }

  leaveEvent(eventSignupRequest: EventSignupRequest) : Observable<string> {
    return this.http.post(`${environment.apiHost+this.apiUrl}/leave`, eventSignupRequest, {responseType: 'text'});
  }

  fetchUserEvents(userId: string): Observable<EventInfoResponse[]> {
    return this.http.get<EventInfoResponse[]>(`${environment.apiHost+this.apiUrl}/fetch_users/${userId}`)
  }
}
