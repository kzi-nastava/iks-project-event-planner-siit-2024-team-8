import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {User, returnUser, UserType} from '../model/user';
import {UserService} from '../services/user-service';
import {UserTransferService} from '../services/user-transfer-service';
import {MatDialog} from '@angular/material/dialog';
import {
  VerificationEmailDialogComponent
} from '../dialogs/verification-email-dialog/verification-email-dialog.component';
import {
  DeleteConfirmationDialogComponent
} from '../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

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
  imageUrl: string = 'https://via.placeholder.com/150'; // Default placeholder image
  imageSelected: boolean = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Set the image source to the selected file
        this.imageSelected = true; // Enable the "Next" button
      };

      reader.readAsDataURL(file); // Convert the image file to a data URL
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
    //make sure data ok
    if (!(this.validateData())) {
      alert('Please enter all the required fields.');
      return;
    }
    let user : User = returnUser(this.firstName, this.lastName, this.email, this.password, this.number, this.imageUrl, this.address, this.profileType as UserType)
    if (this.profileType == 'PROVIDER') {
      this.userTransferService.setUser(user);
      this.router.navigate(['/provider-register']);
    } else {
      this.userService.registerUser(user).subscribe((response: any) => {console.log(response);});

      const dialogRef = this.dialog.open(VerificationEmailDialogComponent);
    }
  }
}
