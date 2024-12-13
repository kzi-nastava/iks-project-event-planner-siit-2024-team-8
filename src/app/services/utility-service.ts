import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utility } from '../model/utility';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private apiUrl = 'http://localhost:8080/api/utilities';

  constructor(private http: HttpClient) {}

  getAllUtilities(): Observable<Utility[]> {
    return this.http.get<Utility[]>(`${this.apiUrl}/all`);
  }

  getUtilityById(id: string): Observable<Utility> {
    return this.http.get<Utility>(`${this.apiUrl}/${id}`);
  }

  createUtility(formData: FormData): Observable<Object> {
    console.log(formData);
    return this.http.post(this.apiUrl, formData);
  }

  updateUtility(id: string, formData: FormData): Observable<Object> {
    return this.http.put<Utility>(`${this.apiUrl}/${id}`, formData);
  }

  deleteUtility(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addUtilityToFavorites(id: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${id}/favorite`, null);
  }

  removeUtilityFromFavorites(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}/favorite`);
  }
}