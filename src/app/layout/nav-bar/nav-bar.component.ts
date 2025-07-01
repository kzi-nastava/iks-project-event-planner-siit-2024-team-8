import { Component } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {AuthService} from '../../infrastructure/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  private isLoggedIn: boolean = false;
  role : string = '';
  constructor(private router: Router,private authService: AuthService) {}

  ngOnInit() {
    this.authService.userState.subscribe(user => {
      const tokenValid = this.authService.isLoggedIn() && !this.authService.isTokenExpired();
      this.isLoggedIn = user != null && user !== '' && tokenValid;
      this.role = tokenValid ? user.toUpperCase() : '';
    });

    this.checkTokenAndRedirect();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.checkTokenAndRedirect();
      }
    });
  }

  checkTokenAndRedirect() {
    if (this.authService.isLoggedIn() && this.authService.isTokenExpired()) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  navigateToLogin(): void {
    this.isLoggedIn?this.router.navigate(['/profile']): this.router.navigate(['/login']);
  }

  onClickPlaceholder() {
    // REMOVE FUNCTION ONCE ALL PAGES ADDED TO THE APP
    alert("TODO")
  }

  onClickCreateEvent() {
    this.router.navigate(['/create-event']);
  }

  onClickCalendar() {
    this.router.navigate(['/calendar']);
  }

  onClickInbox() {
    this.router.navigate(['/inbox']);
  }
}
