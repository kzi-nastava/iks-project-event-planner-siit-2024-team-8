import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Login} from '../model/login.model';
import {AuthService} from '../auth.service';
import {AuthResponse} from '../model/auth-response.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../../services/toast-service';
import {HttpErrorResponse} from '@angular/common/http';
import {EventService} from '../../../services/event-service';
import {EventSignupRequest} from '../../../event/domain/EventSignupRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  eventID: string = "";

  constructor(private router: Router,
              private authService: AuthService,
              private toastService: ToastService,
              private eventService: EventService,
              private route : ActivatedRoute) {}

  ngOnInit() {
    try{
      this.email = this.route.snapshot.queryParamMap.get('email');
      this.eventID = this.route.snapshot.queryParamMap.get('eventID');
    }catch(error){}
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
  navigateToKT1(): void {
    this.router.navigate(['/profile']);
  }

  loginForm = new FormGroup({
    email: new FormControl(this.email, Validators.required),
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
          localStorage.setItem('userID', response.id);
          this.authService.setUser();
          this.authService.setUserId(response.id);
          this.router.navigate(['home']);
          this.toastService.showToast({
            message: 'Successfully logged in!',
            title: 'Success',
            type: 'success',
            duration: 3000,
          });
          if (this.eventID != null && this.email !=null) {this.signUpToEvent()}
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.toastService.showErrorToast("User not found.");
          } else if(err.status === 403) {
            this.toastService.showErrorToast("User not activated.");
          }else if (err.status === 423) {
            this.toastService.showErrorToast(`Your account is suspended!\n${err.error.message}`);
          }
          else {
            this.toastService.showErrorToast("An unexpected error occurred.");
          }
        },
      });
    }
  }

  signUpToEvent(): void {
    let request : EventSignupRequest = {
      userId : localStorage.getItem('userID'),
      eventId : this.eventID,
    }
    this.eventService.signupUserToEvent(request).subscribe((response: string)=> {
      console.log(response);
    })
  }

}

