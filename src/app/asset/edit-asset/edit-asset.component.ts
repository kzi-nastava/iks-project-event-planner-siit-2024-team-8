import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent {
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

  categories: string[] = ['Health', 'Education', 'Technology', 'Lifestyle']; 
  serviceType = {
    category: '',
    newCategory: ''
  };

  showNewCategoryField = false;

  images: string[] = ['https://via.placeholder.com/800x500.png?text=Default+Image'];
  currentImageIndex: number = 0;

  onCategoryChange() {
    this.showNewCategoryField = this.service.category === 'none';
  }

  onFileSelected(event: any): void {
    const files = event.target.files as FileList; 
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (file instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              if (this.images[0].includes('placeholder')) {
                this.images = []; 
              }
              this.images.push(reader.result as string);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

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
