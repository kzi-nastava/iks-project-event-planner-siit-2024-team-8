import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './domain/user';
import {environment} from '../../env/environment';
import {Observable} from 'rxjs';
import {Form} from '@angular/forms';
import {UserInfoResponse} from './domain/user.info.response';
import {ApiResponse} from '../model/api.response';
import {BlockedUserResponse} from './domain/blocked.user.response';
import {CreateReportRequest} from './domain/createReportRequest';
import {ProviderInfoResponse} from './domain/ProviderInfoResponse';
import {UserUpdateResponse} from './domain/user-update-response';
import {EventInfoResponse} from '../event/domain/EventInfoResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registerApiUrl = 'http://localhost:8080/api/users/register';
  private activateApiUrl = 'http://localhost:8080/api/activation-requests/authenticate';
  private updateApiUrl = 'http://localhost:8080/api/users/update';
  private deactivateApiUrl = 'http://localhost:8080/api/users/delete';
  private apiUrl = '/users';


  constructor(private http: HttpClient) {
  }

  registerUser(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.registerApiUrl, formData);
  }

  fastRegisterUser(email: string, password: string, eventID: string): Observable<ApiResponse> {
    let params = new HttpParams();
    params = params.set('email', email)
      .set('password', password)
      .set('eventID', eventID);
    return this.http.post<ApiResponse>(`${environment.apiHost + this.apiUrl}/fast-register`, params);
  }

  activateUser(token: string) {
    return this.http.put(this.activateApiUrl, token);
  }

  getUserInfo(): Observable<UserInfoResponse> {
    return this.http.get<UserInfoResponse>(environment.apiHost + '/users/user')
  }

  getProviderInfo(id: string): Observable<ProviderInfoResponse> {
    return this.http.get<ProviderInfoResponse>(environment.apiHost + `/users/provider/${id}`);
  }

  updateUser(formData: FormData) {
    return this.http.put(this.updateApiUrl, formData, {responseType: 'text'});
  }

  deleteUser(email: string) {
    return this.http.delete(this.deactivateApiUrl + "/" + email, {responseType: 'text'});
  }

  getUserById(userId: string): Observable<UserInfoResponse> {
    return this.http.get<UserInfoResponse>(`${environment.apiHost+this.apiUrl}/${userId}`);
  }

  blockUser(blockedId: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${environment.apiHost + this.apiUrl}/block/${blockedId}`, blockedId);
  }

  getBlockedUsers(): Observable<BlockedUserResponse[]> {
    console.log(localStorage.getItem('userID'));
    return this.http.get<BlockedUserResponse[]>(`${environment.apiHost + this.apiUrl}/blocked/${localStorage.getItem('userID')}`);
  }

  updateBlockedUsers(blockedUsers: string[]): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${environment.apiHost + this.apiUrl}/blocked/${localStorage.getItem('userID')}`, blockedUsers);
  }

  reportUser(report: CreateReportRequest) {
    return this.http.post<ApiResponse>(`${environment.apiHost}/reports`, report);
  }

  suspendUser(id : string) {
    console.log(id);
    return this.http.put<ApiResponse>(`${environment.apiHost}/reports/suspend`,id);
  }

  addToFavs(userId: string, eventId: string) {
    return this.http.put(`${environment.apiHost+this.apiUrl}/favorite/${userId}`, eventId)
  }

  unaddToFavs(userId: string, eventId: string) {
    return this.http.put(`${environment.apiHost+this.apiUrl}/unfavorite/${userId}`, eventId)
  }

  getFavs(userId: string): Observable<EventInfoResponse[]> {
    return this.http.get<EventInfoResponse[]>(`${environment.apiHost+this.apiUrl}/fetch-favs/${userId}`)
  }

  checkFavorite(userId: string, eventId: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiHost+this.apiUrl}/is-favorite/${userId}`, eventId);
  }
}
