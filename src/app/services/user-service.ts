import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registerApiUrl = 'http://localhost:8080/api/users/register';
  private activateApiUrl = 'http://localhost:8080/api/activation-requests/authenticate';

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    return this.http.post(this.registerApiUrl, user);
  }
  activateUser(token: string) {
    return this.http.put(this.activateApiUrl,token);
  }
}
