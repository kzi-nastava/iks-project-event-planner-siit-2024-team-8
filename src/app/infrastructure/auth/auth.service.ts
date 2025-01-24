import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from '../../../env/environment';
import {AuthResponse} from './model/auth-response.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();

  userID$ = new BehaviorSubject("");
  userIdState = this.userID$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  login(auth: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost + '/login', auth, {
      headers: this.headers,
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userID');
    this.setUser();
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).role;
    }
    return null;
  }

  getUserId() {
    if (this.isLoggedIn()){
      return localStorage.getItem('userID');
    }
    return null
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  setUserId(id: string): void {
    this.userID$.next(this.getUserId());
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    return decoded.exp < currentTime;
  }

  getToken(): string | null {
    return localStorage.getItem('user');
  }

  decodeToken(token: string): any {
    if (!token) return null;
    const payload = atob(token.split('.')[1]);
    return JSON.parse(payload);
  }

}
