import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router) {}
  onSubmit() {
    console.log('Registration complete!');
  }
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
  navigateToProvider() {
    if (this.profileType == "PROVIDER") {
      this.router.navigate(['/provider-register']);
    }
  }
}
