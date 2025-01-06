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

    isValid : boolean = true;

    constructor(private userService: UserService, private router: Router,private route: ActivatedRoute,
                private dialog: MatDialog,private toastService : ToastService) {}

    ngOnInit() {
      this.email = this.route.snapshot.queryParamMap.get('email');
    }

  onRegisterClick() {
    if (this.password == "" || this.confirmPassword != "" || this.password != this.confirmPassword) {
      this.isValid  = false;
      return;
    }
    let formData : FormData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);
    this.userService.registerUser(formData).subscribe({
      next: (response: ApiResponse) => {
          if (response.success) {
              this.toastService.showSuccessToast("Registered successfully.");
              this.router.navigate(['/home']);
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
