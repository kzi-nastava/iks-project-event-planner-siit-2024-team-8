import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {

  private baseUrl = 'http://localhost:8080/api/email-validation'; // Spring Boot API endpoint

  constructor(private http: HttpClient) { }

  checkEmailExistence(email: string): Observable<{ isValid: boolean }> {
    return this.http.post<{ isValid: boolean }>(`${this.baseUrl}/check`, { email });
  }
}
