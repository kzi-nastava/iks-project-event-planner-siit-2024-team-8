import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserTransferService} from '../../user/user-transfer-service';
import {UserService} from '../../user/user-service';
import {VerificationEmailDialogComponent} from '../../dialogs/verification-email-dialog/verification-email-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../user/domain/user';
import {ProviderService} from '../provider.service';

@Component({
  selector: 'app-provider-register',
  templateUrl: './provider-register.component.html',
  styleUrl: './provider-register.component.css'
})
export class ProviderRegisterComponent implements OnInit {
  user: User;
  formData: FormData;

  constructor(private dialog: MatDialog, private router: Router, private userTransferService: UserTransferService,
              private providerService : ProviderService) {}
  ngOnInit(): void {
    this.user = this.userTransferService.user;
    this.formData = this.userTransferService.formData;
    console.log(this.user);
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  imageFiles : File[] = [];
  imageUrl1: string = 'https://via.placeholder.com/150'; // Default placeholder image
  imageUrl2: string = 'https://via.placeholder.com/150';
  imageUrl3: string = 'https://via.placeholder.com/150';
  imageSelected: boolean = false;

  onFileSelected1(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageFiles.push(file);
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl1 = e.target.result; // Set the image source to the selected file
        this.imageSelected = true; // Enable the "Next" button
      };

      reader.readAsDataURL(file); // Convert the image file to a data URL
    }
  }
  onFileSelected2(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageFiles.push(file);
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl2 = e.target.result; // Set the image source to the selected file
        this.imageSelected = true; // Enable the "Next" button
      };

      reader.readAsDataURL(file); // Convert the image file to a data URL
    }
  }
  onFileSelected3(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageFiles.push(file);
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl3 = e.target.result; // Set the image source to the selected file
        this.imageSelected = true; // Enable the "Next" button
      };

      reader.readAsDataURL(file); // Convert the image file to a data URL
    }
  }

  companyName: string = '';
  companyDesc: string = '';

  validateData(): boolean {
    return this.companyName != '';
  }
  onSubmit() {
    if (!(this.validateData())) {
      console.log(this.companyName)
      console.log(this.companyDesc)
      alert("You must enter the name and description of your company!");
      return;
    }
    this.user.companyName = this.companyName;
    this.user.companyDescription = this.companyDesc;
    this.imageFiles.forEach((file, index) => {
      this.formData.append('companyImages', file); // 'images' is the key to access files in the backend
    });
    Object.entries(this.user).forEach(([key, value]) => this.formData.append(key, value))
    console.log(this.formData);
    this.providerService.registerProvider(this.formData).subscribe((response: any) => {
      console.log(response);
    });

    const dialogRef = this.dialog.open(VerificationEmailDialogComponent);
  }
}
