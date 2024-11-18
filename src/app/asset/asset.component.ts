import { Component } from '@angular/core';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {
  service = {
    category: '',
    name: '',
    description: '',
    price: '',
    discount: '',
    images: [] as string[],  
    eventTypes: [] as string[],
    visibility: true,
    availability: true,
    duration: '',
    bookingDeadline: '',
    cancellationDeadline: '',
    confirmationMethod: 'automatic',
  };

  showNewCategoryField = false;

  images: string[] = ['https://via.placeholder.com/800x500.png?text=Default+Image'];
  currentImageIndex: number = 0;

  

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  onSubmit(): void {
    console.log('Form submitted with data:', this.service);
  }
}
