import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetService } from '../asset.service';
import { Asset, AssetType } from '../../model/asset';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit {
  service: Asset = {
    id: 0, 
    name: '',
    type: AssetType.SERVICE,
    description: '',
    category: '',
    price: 0, 
    discount: 0, 
    images: [] as string[],
    eventTypes: [] as string[],
    visibility: true,
    availability: true,
    duration: 0, 
    bookingDeadline: '',
    cancellationDeadline: '',
    confirmationMethod: 'automatic',
    newCategory: undefined 
  };

  isService: boolean = false;

  categories: string[] = ['Health', 'Education', 'Technology', 'Lifestyle'];
  showNewCategoryField = false;

  images: string[] = ['https://via.placeholder.com/800x500.png?text=Default+Image'];
  currentImageIndex: number = 0;

  constructor(private assetService: AssetService, private router: Router) {}

  ngOnInit(): void {
    const selectedAsset = this.assetService.getSelectedAsset();
    if (!selectedAsset) {
      this.router.navigate(['/asset']);
    } else {
      this.service = { ...selectedAsset }; 
      this.isService = this.service.type === AssetType.SERVICE; 
      this.images = this.service.images.length > 0 ? this.service.images : this.images;
    }
  }

  onCategoryChange(): void {
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
    const updatedAsset = { ...this.service, images: this.images };
    this.assetService.setSelectedAsset(updatedAsset);
    console.log('Updated asset:', updatedAsset);

    this.navigateToAsset();
  }

  navigateToAsset(): void {
    if (this.service.id) {
      this.router.navigate(['/asset', this.service.id]); 
    } else {
      this.router.navigate(['/asset']); 
    }
  }
}
