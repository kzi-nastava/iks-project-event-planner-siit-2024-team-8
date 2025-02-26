import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../infrastructure/auth/auth.service';

@Component({
  selector: 'app-nav-bar-side',
  templateUrl: './nav-bar-side.component.html',
  styleUrl: './nav-bar-side.component.css'
})
export class NavBarSideComponent {
  role : string = '';
  isLoggedIn: boolean = false;

  constructor(public router: Router,public authService: AuthService,) {}
  ngOnInit() : void {
    this.authService.userState.subscribe(user => {
      this.isLoggedIn = !(user === '' || user == null);
      if (!(user === '' || user == null)){
        this.role = user.toUpperCase();
      }
    })
  }

  onClickPlaceholder() {
    // REMOVE FUNCTION ONCE ALL THE PAGES ARE ADDED TO THE APP
    alert('TODO');
  }

  navigateToLogin() {
    this.isLoggedIn?this.router.navigate(['/profile']): this.router.navigate(['/login']);
  }
}
