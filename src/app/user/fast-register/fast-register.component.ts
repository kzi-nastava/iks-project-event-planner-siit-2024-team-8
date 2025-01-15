import { Component } from '@angular/core';
import {UserService} from '../user-service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  VerificationEmailDialogComponent
} from '../../dialogs/verification-email-dialog/verification-email-dialog.component';
import {ErrorCodeDialogComponent} from '../../dialogs/error-code-dialog/error-code-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ApiResponse} from '../../model/api.response';
import {ToastService} from '../../services/toast-service';

@Component({
  selector: 'app-fast-register',
  templateUrl: './fast-register.component.html',
  styleUrl: './fast-register.component.css'
})
export class FastRegisterComponent {
    password : string = "";
    confirmPassword : string = "";
    email : string = "";
    eventID : string = "";

    isValid : boolean = false;

    constructor(private userService: UserService, private router: Router,private route: ActivatedRoute,
                private dialog: MatDialog,private toastService : ToastService) {}

    ngOnInit() {
      this.email = this.route.snapshot.queryParamMap.get('email');
      this.eventID = this.route.snapshot.queryParamMap.get('eventID');
    }

  onRegisterClick() {
    if (this.password == "" || this.confirmPassword == "" || this.password != this.confirmPassword) {
      console.log("entered")
      console.log(this.password);
      console.log(this.confirmPassword);
      this.isValid  = false;
      return;
    }
    this.userService.fastRegisterUser(this.email,this.password,this.eventID).subscribe({
      next: (response: ApiResponse) => {
          if (response.success) {
              this.toastService.showSuccessToast("Registered successfully.");
              this.router.navigate(['/login']);
          }
      },
      error: (error) => {
        this.dialog.open(ErrorCodeDialogComponent, {
          data: { errorCode: error.status },
        });
      },
    });
  }
}
