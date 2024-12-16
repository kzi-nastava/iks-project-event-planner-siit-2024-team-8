import {Injectable} from '@angular/core';
import {User} from './domain/user';
import {user} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserTransferService {
  private _user: User;
  private _formData: FormData;

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get formData(): FormData {
    return this._formData;
  }

  set formData(value: FormData) {
    this._formData = value;
  }
}
