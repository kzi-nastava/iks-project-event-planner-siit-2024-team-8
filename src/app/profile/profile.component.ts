import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../infrastructure/auth/auth.service';
import {UserService} from '../services/user-service';
import {User} from '../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  role : string = '';
  currentUser : User;
  constructor(private router: Router,private authService: AuthService,private userService: UserService) { }

  public ngOnInit() {
    this.authService.userState.subscribe(user => {
      this.role = user;
    })
    this.userService.getUserInfo().subscribe((response: any) => {
      this.currentUser = response.getUser();
    })
  }

  navigateToCreateAsset(): void {
    this.router.navigate(['/create-asset']);
  }

  navigateToEditProfile(): void {
    this.router.navigate(['/profile-edit']);
  }
}
