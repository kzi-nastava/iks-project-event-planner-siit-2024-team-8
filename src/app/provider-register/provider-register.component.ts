import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserTransferService} from '../services/user-transfer-service';
import {UserService} from '../services/user-service';

@Component({
  selector: 'app-provider-register',
  templateUrl: './provider-register.component.html',
  styleUrl: './provider-register.component.css'
})
export class ProviderRegisterComponent implements OnInit {
  user: any;
  constructor(private router: Router, private userTransferService: UserTransferService, private userService: UserService) {}
  ngOnInit(): void {
    this.user = this.userTransferService.getUser();
    console.log(this.user);
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  imageUrl1: string = 'https://via.placeholder.com/150'; // Default placeholder image
  imageUrl2: string = 'https://via.placeholder.com/150';
  imageUrl3: string = 'https://via.placeholder.com/150';
  imageSelected: boolean = false;

  onFileSelected1(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
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
    if (this.companyName == '' || this.companyDesc == '') {
      return false;
    }
    return true;
  }
  onSubmit() {
    if (!(this.validateData())) {
      alert("You must enter the name and description of your company!");
      return;
    }
    this.user.companyName = this.companyName;
    this.user.companyDesc = this.companyDesc;
    this.user.companyImagesURL = [this.imageUrl1, this.imageUrl2, this.imageUrl3];
    this.userService.registerUser(this.user).subscribe((response: any) => {console.log(response);});
  }
}
