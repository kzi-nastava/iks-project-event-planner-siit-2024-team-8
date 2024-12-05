import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registerApiUrl = 'localhost:8080/api/users';
  private activateApiUrl = 'localhost:8080/api/activation-requests';

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    return this.http.post(this.registerApiUrl, user);
  }
  activateUser(token: string) {
    return this.http.post(this.activateApiUrl, token);
  }
}
