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
import {Review} from '../model/review';
import {AgendaUpdateRequest} from '../event/domain/AgendaUpdateRequest';
import {GuestlistUpdateRequest} from '../event/domain/GuestlistUpdateRequest';
import {GuestResponse} from '../user/domain/guest-response';
import {ActivityUpdateRequest} from '../event/domain/ActivityUpdateRequest';
import {PageProperties} from '../model/page.properties';

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

  getTop5Events(pageProperties? : any): Observable<EventCardResponse[]> {
    return this.http.get<EventCardResponse[]>(`${environment.apiHost + this.apiUrl}/top5`)
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
  filterEvents(request:SearchEventsRequest,pageProperties? : PageProperties): Observable<PagedResponse<EventCardResponse>> {
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
      if (pageProperties.sortBy !== null) {
        params = params.set('sortBy', pageProperties.sortBy);
      }

      if (pageProperties.sortOrder !== null) {
        params = params.set('sortOrder', pageProperties.sortOrder);
      }
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.pageSize)
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

  fetchEventAgenda(eventId: string): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiHost + this.apiUrl}/fetch_agenda/${eventId}`, {
      responseType: 'blob' as 'json' // Explicitly set the responseType to 'blob'
    });
  }

  fetchActivities(eventId: string): Observable<AgendaUpdateRequest> {
    return this.http.get<AgendaUpdateRequest>(`${environment.apiHost+this.apiUrl}/fetch_activities/${eventId}`);
  }

  updateEventAgenda(eventId: string, agendaUpdateRequest: AgendaUpdateRequest) : Observable<string> {
    return this.http.put(`${environment.apiHost+this.apiUrl}/update_agenda/${eventId}`, agendaUpdateRequest, {responseType: 'text'});
  }

  fetchGuestlist(eventId: string): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiHost + this.apiUrl}/fetch_guestlist/${eventId}`, {
      responseType: 'blob' as 'json' // Explicitly set the responseType to 'blob'
    });
  }

  fetchGuests(eventId: string): Observable<GuestResponse[]> {
    return this.http.get<GuestResponse[]>(`${environment.apiHost + this.apiUrl}/fetch_guests/${eventId}`)
  }

  updateGuestlist(eventId: string, guestlistUpdateRequest: GuestlistUpdateRequest) : Observable<string>  {
    return this.http.put(`${environment.apiHost+this.apiUrl}/update_guestlist/${eventId}`, guestlistUpdateRequest, {responseType: 'text'});
  }

  submitReview(eventId: string, reviewData: any) {
    return this.http.post(`${environment.apiHost+this.apiUrl}/${eventId}/review`, reviewData);
  }

  getReviews(eventId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiHost + this.apiUrl}/${eventId}/reviews`);
  }

  getPublics(): Observable<EventInfoResponse[]> {
    return this.http.get<EventInfoResponse[]>(`${environment.apiHost + this.apiUrl}/publics`)
  }

  checkAssetInOrganizedEvents(userId: string, assetId: string): Observable<boolean> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('assetId', assetId);

    return this.http.get<boolean>(`${environment.apiHost + this.apiUrl}/check-asset`, { params });
  }

  chartReviews(eventId: string): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiHost + this.apiUrl}/chart-reviews/${eventId}`, {
      responseType: 'blob' as 'json' // Explicitly set the responseType to 'blob'
    });
  }

}
