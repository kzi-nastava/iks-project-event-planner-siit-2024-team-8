import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import {EventInfoResponse} from '../event/domain/EventInfoResponse';
import {EventUpdateRequest} from '../event/domain/EventUpdateRequest';
import {ApiResponse} from '../model/api.response';
import {A} from '@angular/cdk/keycodes';
import {environment} from '../../env/environment';
import {EventDTO} from '../event/domain/EventDTO.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = '/events';

  constructor(private http: HttpClient) {}
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/all`);
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
  /*deleteEvent(id: string): Observable<Object> {
    return this.http.delete(`${environment.apiHost+this.apiUrl}/delete/${id}`);
  }*/
}
