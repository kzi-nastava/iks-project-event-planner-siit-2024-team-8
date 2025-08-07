import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../services/utility-service';
import { ProductService } from '../../services/product-service';
import { Asset } from '../../model/asset';
import {Utility} from '../../model/utility';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit {
  asset: Asset = {
    id: null,
    category: '',
    name: '',
    description: '',
    price: 0,
    discount: 0,
    grade: 0,
    images: [],
    possibleEventTypes: [],
    visible: false,
    available: false,
    status: '',
    deleted: false,
    providerId: '',
  };

  isUtility: boolean = false;
  isProduct: boolean = true;
  assetType: string = 'product';

  utilityDuration: number;
  utilityReservationTerm: number;
  utilityCancellationTerm: number;
  utilityManualConfirmation: boolean;

  images: File[] = [];
  imagePreviews: string[] = [];
  currentImageIndex: number = 0;
  validationMessages: any = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const assetId = this.activatedRoute.snapshot.paramMap.get('id');
    if (assetId) {
      this.fetchAssetDetails(assetId);
    }
  }

  fetchAssetDetails(assetId: string): void {
    const isUtilityRoute = this.router.url.includes('/utilities');
    const isProductRoute = this.router.url.includes('/products');

    if (isUtilityRoute) {
      this.utilityService.getUtilityById(assetId).subscribe(
        (utility: Utility) => {
          this.asset = utility;
          this.imagePreviews = utility.images || ['https://via.placeholder.com/800x500.png?text=Default+Image'];
          this.onAssetTypeChange('utility');

          this.utilityDuration = utility.duration;
          this.utilityReservationTerm = utility.reservationTerm;
          this.utilityCancellationTerm = utility.cancellationTerm;
          this.utilityManualConfirmation = utility.manuelConfirmation;

        },
        (error) => {
          console.error('Error fetching utility details:', error);
        }
      );
    } else if (isProductRoute) {
      this.productService.getProductById(assetId).subscribe(
        (asset: Asset) => {
          this.asset = asset;
          this.imagePreviews = asset.images || ['https://via.placeholder.com/800x500.png?text=Default+Image'];
          this.onAssetTypeChange('product');
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    } else {
      console.error('Unknown asset type');
    }
  }

  onAssetTypeChange(type: string): void {
    this.assetType = type;
    this.isUtility = type === 'utility';
    this.isProduct = type === 'product';
  }

  onFileSelected(event: any): void {
    const files = event.target.files as FileList;
    if (files && files.length > 0) {
      this.images = []; // Clear previous images
      this.imagePreviews = []; // Clear previews

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);

        this.images.push(file); // Push the file to images for FormData
      }
    }
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.imagePreviews.length - 1) {
      this.currentImageIndex++;
    }
  }

  validateForm(): boolean {
    this.validationMessages = {};
    if (!this.asset.name || this.asset.name.length > 20 || !/^[a-zA-Z\s]+$/.test(this.asset.name)) {
      this.validationMessages.name = 'Asset name should contain only letters and spaces, and be less than 20 characters.';
    }

    if (!this.asset.description ) {
      this.validationMessages.name = 'Asset description is required.';
    }

    if (this.asset.price < 1 || this.asset.price > 999999 || !this.asset.price) {
      this.validationMessages.price = 'Price must be between 1 and 999999.';
    }

    if (this.asset.discount < 0 || this.asset.discount > 100) {
      this.validationMessages.discount = 'Discount must be between 0 and 100.';
    }

    if (this.isUtility) {
      if (this.utilityDuration < 1 || this.utilityDuration > 999 || !this.utilityDuration) {
        this.validationMessages.utilityDuration = 'Duration must be between 1 and 999.';
      }

      if (!this.utilityReservationTerm || !this.utilityCancellationTerm) {
        this.validationMessages.utilityTerms = 'Please select both reservation and cancellation terms.';
      }
    }

    return Object.keys(this.validationMessages).length === 0;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    let formData = new FormData();

    if (this.images && this.images.length > 0) {
      for (let i = 0; i < this.images.length; i++) {
        const imageFile = this.images[i];
        formData.append('images', imageFile, imageFile.name); // Append the file for uploading
      }
    }

    formData.append('name', this.asset.name);
    formData.append('description', this.asset.description);
    formData.append('price', this.asset.price.toString());
    formData.append('discount', this.asset.discount.toString());
    formData.append('visible', this.asset.visible.toString());
    formData.append('available', this.asset.available.toString());
    formData.append('provider', this.asset.providerId);

    if (this.isUtility) {
      formData.append('duration', this.utilityDuration.toString());
      formData.append('reservationTerm', this.utilityReservationTerm.toString());
      formData.append('cancellationTerm', this.utilityCancellationTerm.toString());
      formData.append('manuelConfirmation', this.utilityManualConfirmation.toString());
      console.log('FormData after appending: ', formData);

      this.utilityService.updateUtility(this.asset.id, formData).subscribe(
        (updatedUtility) => {
          console.log('Utility updated:', updatedUtility);
          this.navigateToAsset();
        },
        (error) => {
          console.error('Error updating utility:', error);
        }
      );
    } else if (this.isProduct) {
      console.log('images after appending', this.images);
      this.productService.updateProduct(this.asset.id, formData).subscribe(
        (updatedProduct) => {
          console.log('Product updated:', updatedProduct);
          this.navigateToAsset();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  navigateToAsset(): void {
    if (this.isUtility) {
      this.router.navigate([`/assets/utilities/${this.asset.id}`]);
    } else if (this.isProduct) {
      this.router.navigate([`/assets/products/${this.asset.id}`]);
    }
  }
}
