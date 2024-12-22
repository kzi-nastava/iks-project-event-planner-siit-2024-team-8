import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import {EventInfoResponse} from '../event/domain/EventInfoResponse';
import {EventUpdateRequest} from '../event/domain/EventUpdateRequest';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {}
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/all`);
  }
  getEventById(id: string): Observable<EventInfoResponse> {
    return this.http.get<EventInfoResponse>(`${this.apiUrl}/${id}`);
  }
  updateEvent(eventUpdateRequest: EventUpdateRequest) :Observable<Object> {
    return this.http.put(this.apiUrl + "/update", eventUpdateRequest);
  }
  deleteEvent(id: string): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
