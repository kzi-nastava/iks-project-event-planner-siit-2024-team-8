import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {UserInfoResponse} from '../domain/user.info.response';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {UserService} from '../user-service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {
  role : string = '';
  selectedFile: File | null = null;
  profilePictureUrl: string = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
  email_input: string = '';
  firstName_input: string = '';
  lastName_input: string = '';
  address_input: string = '';
  number_input: string = '';
  currentUser : UserInfoResponse = null;

  constructor(private router: Router,private authService: AuthService,private userService: UserService,
              private dialog: MatDialog) { }

  public ngOnInit() {
    this.authService.userState.subscribe(user => {
      this.role = user;
    })
    this.userService.getUserInfo().subscribe({
      next: (data: UserInfoResponse) => {
        this.currentUser = data;
        this.email_input = data.email;
        this.firstName_input = data.firstName;
        this.lastName_input = data.lastName;
        this.address_input = data.address;
        this.number_input = data.number;
        this.profilePictureUrl = data.profileImage;
        console.log(data.firstName);}
    })
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any): void {
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

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteItem();
      }
    });
  }

  deleteItem() {
    console.log('Item deleted!');
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
