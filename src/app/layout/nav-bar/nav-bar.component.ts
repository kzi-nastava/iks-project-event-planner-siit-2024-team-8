import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../infrastructure/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  private isLoggedIn: boolean = false;
  constructor(private router: Router,private authService: AuthService) {}

  ngOnInit() {
    this.authService.userState.subscribe(user => {
      this.isLoggedIn = !(user === '' || user == null);
    })
  }

  navigateToLogin(): void {
    this.isLoggedIn?this.router.navigate(['/profile']): this.router.navigate(['/login']);
  }

  onClickPlaceholder() {
    // REMOVE FUNCTION ONCE ALL PAGES ADDED TO THE APP
    alert("TODO")
  }

}
