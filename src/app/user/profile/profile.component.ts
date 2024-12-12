import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {UserService} from '../user-service';
import {User} from '../domain/user';
import {UserInfoResponse} from '../domain/user.info.response';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  role : string = '';
  currentUser : UserInfoResponse = null;
  constructor(private router: Router,private authService: AuthService,private userService: UserService) { }

  public ngOnInit() {
    this.authService.userState.subscribe(user => {
      this.role = user;
    })
    this.userService.getUserInfo().subscribe({
      next: (data: UserInfoResponse) => { this.currentUser = data;
      console.log(data.firstName);}
    })
  }

  navigateToCreateAsset(): void {
    this.router.navigate(['/create-asset']);
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/profile-edit']);
  }
}
