import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './domain/user';
import {environment} from '../../env/environment';
import {Observable} from 'rxjs';
import {Form} from '@angular/forms';
import {UserInfoResponse} from './domain/user.info.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registerApiUrl = 'http://localhost:8080/api/users/register';
  private activateApiUrl = 'http://localhost:8080/api/activation-requests/authenticate';

  constructor(private http: HttpClient) {}

  registerUser(formData : FormData): Observable<Object> {
    return this.http.post(this.registerApiUrl, formData);
  }
  activateUser(token: string) {
    return this.http.put(this.activateApiUrl,token);
  }
  getUserInfo() :Observable<UserInfoResponse> {
    return this.http.get<UserInfoResponse>(environment.apiHost + '/users/user')
  }
}
