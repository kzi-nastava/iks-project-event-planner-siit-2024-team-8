import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Login} from '../model/login.model';
import {AuthService} from '../auth.service';
import {AuthResponse} from '../model/auth-response.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../../services/toast-service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router,
              private authService: AuthService,
              private toastService: ToastService) {}

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
  navigateToKT1(): void {
    this.router.navigate(['/profile']);
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  login(): void {
    if(this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.token);
          this.authService.setUser();
          this.router.navigate(['home']);
          this.toastService.showToast({
            message: 'Successfully logged in!',
            title: 'Success',
            type: 'success',
            duration: 3000,
          });
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.toastService.showErrorToast("User not found.");
          } else {
            this.toastService.showErrorToast("An unexpected error occurred.");
          }
        },
      });
    }
  }

}

