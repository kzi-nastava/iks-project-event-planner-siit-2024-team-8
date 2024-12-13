import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {User, returnUser, UserType} from '../domain/user';
import {UserService} from '../user-service';
import {UserTransferService} from '../user-transfer-service';
import {MatDialog} from '@angular/material/dialog';
import {
  VerificationEmailDialogComponent
} from '../../dialogs/verification-email-dialog/verification-email-dialog.component';
import {ErrorCodeDialogComponent} from '../../dialogs/error-code-dialog/error-code-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(private dialog: MatDialog, private router: Router, private userService: UserService, private userTransferService: UserTransferService) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  imageUrl: "https://via.placeholder.com/150"; // Default placeholder image
  selectedFile: File | null = null;
  imageSelected: boolean = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Set the image source to the selected file
        this.imageSelected = true; // Enable the "Next" button
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  profileType: string = '';
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  number: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';

    validateData(): boolean {
    if (this.firstName == '' || this.lastName == '' || this.imageUrl == 'https://via.placeholder.com/150' || this.email == '' || this.password == '' || this.profileType == '') {
      return false;
    }
    else if (this.password != this.repeatPassword) {
      return false;
    }
    return true;
  }

  onSubmit() {
    if (!(this.validateData())) {
      alert('Please enter all the required fields.');
      return;
    }
    let formData = new FormData();

    if (this.selectedFile) {
      console.log(this.selectedFile);
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    let user : User = returnUser(this.firstName, this.lastName, this.email, this.password, this.number,  this.address, this.profileType as UserType)
    Object.entries(user).forEach(([key, value]) => formData.append(key, value))
    if (this.profileType == 'PROVIDER') {
      this.userTransferService.setUser(user);
      this.router.navigate(['/provider-register']);
    } else {
      this.userService.registerUser(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          // Open the dialog only if registration is successful
          const dialogRef = this.dialog.open(VerificationEmailDialogComponent);
        },
        error: (error) => {
          this.dialog.open(ErrorCodeDialogComponent, {
            data: { errorCode: error.status },
          });
        },
      });
    }
  }
}
