import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UserInfoResponse } from '../domain/user.info.response';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { UserService } from '../user-service';
import { returnUser, User, UserType } from '../domain/user';
import {
  VerificationEmailDialogComponent,
} from '../../dialogs/verification-email-dialog/verification-email-dialog.component';
import { returnUpdatedUser, UserUpdateResponse } from '../domain/user-update-response';
import {ProviderInfoResponse} from '../domain/ProviderInfoResponse';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'], // Fixed typo in "styleUrl" to "styleUrls"
})
export class ProfileEditComponent {
  role: string = '';
  profilePictureUrl: string = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
  selectedFile: File | null = null;
  email_input: string = '';
  firstName_input: string = '';
  lastName_input: string = '';
  address_input: string = '';
  number_input: string = '';
  company_name_input: string = '';
  company_desc_input: string = '';
  currentUser: UserInfoResponse | null = null; // Added proper type annotation

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.authService.userState.subscribe((userRole) => {
      this.role = userRole;

      if (this.role == "Provider") {
        this.userService.getProviderInfo(this.authService.getUserId()).subscribe({
          next: (data: ProviderInfoResponse) => {
            this.email_input = data.email;
            this.firstName_input = data.firstName;
            this.lastName_input = data.lastName;
            this.address_input = data.address;
            this.number_input = data.number;
            this.profilePictureUrl = data.profileImage || this.profilePictureUrl;
            this.company_name_input = data.companyName;
            this.company_desc_input = data.companyDescription;
            console.log(data.firstName);
          }
        });
      } else {
        this.userService.getUserInfo().subscribe({
          next: (data: UserInfoResponse) => {
            this.currentUser = data;
            this.email_input = data.email;
            this.firstName_input = data.firstName;
            this.lastName_input = data.lastName;
            this.address_input = data.address;
            this.number_input = data.number;
            this.profilePictureUrl = data.profileImage || this.profilePictureUrl;
            console.log(data.firstName);
          }
        });
      }
    });
  }


  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profilePictureUrl = e.target.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.deleteItem();
      }
    });
  }

  deleteItem(): void {
    this.userService.deleteUser(this.email_input).subscribe((result) => {console.log(result);})
    localStorage.clear();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    })
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  private createPlaceholderFile(): File {
    // Converts the placeholder image URL to a Blob, then to a File
    const placeholderBlob = new Blob([], { type: 'image/png' });
    return new File([placeholderBlob], 'placeholder.png', { type: 'image/png' });
  }

  submit(): void {

    const formData = new FormData();

    // Add profile image (selected or placeholder)
    if (this.selectedFile) {
      console.log(this.selectedFile);
      formData.append('image', this.selectedFile, this.selectedFile.name);
    } else {
      const placeholderFile = this.createPlaceholderFile();
      console.log('No file selected. Using placeholder image.');
      formData.append('image', placeholderFile, placeholderFile.name);
    }

    // Prepare user update object
    const newUser: UserUpdateResponse = returnUpdatedUser(
      this.firstName_input,
      this.lastName_input,
      this.email_input,
      this.number_input,
      this.address_input,
      this.role === 'Provider' ? this.company_name_input: '',
      this.role === 'Provider' ? this.company_desc_input: '',
      []
    );

    // Append all fields to FormData
    Object.entries(newUser).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, i) => {
          formData.append(`${key}[${i}]`, item);
        });
      } else {
        formData.append(key, value);
      }
    });

    // Submit data
    this.userService.updateUser(formData).subscribe((response: any) => {
      console.log('Update successful:', response);
      this.router.navigate(['/profile']).then(() => {
        window.location.reload();
      });
    });
  }


}
