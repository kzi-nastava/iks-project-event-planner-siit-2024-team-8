import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';
import {environment} from '../../env/environment';
import {EventType} from '../event/domain/event.type';
import {ApiResponse} from '../model/api.response';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  private apiUrl = '/event-types';

  constructor(private http: HttpClient) {}
  getActiveEventTypes(): Observable<EventType[]> {
    return this.http.get<EventType[]>(`${environment.apiHost+this.apiUrl}`+ '/active');
  }
  getDeactivatedEventType(): Observable<EventType[]> {
    return this.http.get<EventType[]>(`${environment.apiHost+this.apiUrl}`+'/deactivated')
  }

  createEventType(eventType : EventType) {
    return this.http.post<EventType>(`${environment.apiHost+this.apiUrl}`, eventType);
  }

  deactivateEventType(eventType : EventType) {
    return this.http.put<EventType>(`${environment.apiHost+this.apiUrl}`+'/deactivate', eventType.id);
  }

  activateEventType(eventType : EventType) {
    return this.http.put<EventType>(`${environment.apiHost+this.apiUrl}`+'/activate', eventType.id);
  }

  updateEventType(eventType : EventType) {
    return this.http.put<EventType>(`${environment.apiHost+this.apiUrl}`, eventType);
  }
}
