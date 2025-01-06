import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './domain/user';
import {environment} from '../../env/environment';
import {Observable} from 'rxjs';
import {Form} from '@angular/forms';
import {UserInfoResponse} from './domain/user.info.response';
import {ApiResponse} from '../model/api.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registerApiUrl = 'http://localhost:8080/api/users/register';
  private activateApiUrl = 'http://localhost:8080/api/activation-requests/authenticate';
  private updateApiUrl = 'http://localhost:8080/api/users/update';
  private deactivateApiUrl = 'http://localhost:8080/api/users/delete';

  constructor(private http: HttpClient) {}

  registerUser(formData : FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.registerApiUrl, formData);
  }
  activateUser(token: string) {
    return this.http.put(this.activateApiUrl,token);
  }
  getUserInfo() :Observable<UserInfoResponse> {
    return this.http.get<UserInfoResponse>(environment.apiHost + '/users/user')
  }
  updateUser(formData : FormData) {
    return this.http.put(this.updateApiUrl, formData, {responseType: 'text'});
  }
  deleteUser(email: string) {
    return this.http.delete(this.deactivateApiUrl + "/" + email, {responseType: 'text'});
  }
}
