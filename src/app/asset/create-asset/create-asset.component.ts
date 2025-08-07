import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../../services/utility-service';
import { ProductService } from '../../services/product-service';
import { AssetCategoryService } from '../../services/asset-category-service';
import { AssetCategory } from '../../model/asset-category';
import { Asset } from '../../model/asset';
import {AuthService} from '../../infrastructure/auth/auth.service';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit {
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
  utilityReservationTerm: string;
  utilityCancellationTerm: string;
  utilityManualConfirmation: boolean = false;

  categories: AssetCategory[] = [];
  showNewCategoryField: boolean = false;
  newCategoryName: string = '';
  newCategoryDescription: string = '';

  images: File[] = []; // for FormData
  imagePreviews: string[] = []; // for display
  currentImageIndex: number = 0;
  validationMessages: any = {};

  constructor(
    private router: Router,
    private utilityService: UtilityService,
    private productService: ProductService,
    private assetCategoryService: AssetCategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.onAssetTypeChange(this.assetType);
  }

  onAssetTypeChange(type: string): void {
    this.assetType = type;
    this.asset.category = null;

    if (type === 'utility') {
      this.isUtility = true;
      this.isProduct = false;

      this.assetCategoryService.getActiveUtilityCategories().subscribe(
        (categories: AssetCategory[]) => {
          this.categories = categories;
          console.log('Fetched utility categories:', categories);

          if (this.categories.length > 0) {
            this.asset.category = this.categories[0].id;
          } else {
        this.asset.category = 'none';
      }
          this.onCategoryChange();
        },
        (error) => {
          console.error('Error fetching utility categories:', error);
        }
      );
    } else if (type === 'product') {
      this.isUtility = false;
      this.isProduct = true;

      this.assetCategoryService.getActiveProductCategories().subscribe(
        (categories: AssetCategory[]) => {
          this.categories = categories;
          console.log('Fetched product categories:', categories);

          if (this.categories.length > 0) {
            this.asset.category = this.categories[0].id;
          }else {
            this.asset.category = 'none';
          }

          this.onCategoryChange();
        },
        (error) => {
          console.error('Error fetching product categories:', error);
        }
      );
    }
  }



  onCategoryChange(): void {
    if (this.asset.category === 'none' || this.asset.category === null) {
      this.showNewCategoryField = true;
    } else {
      this.showNewCategoryField = false;
    }
  }

  onFileSelected(event: any): void {
    const files = event.target.files as FileList;
    if (files && files.length > 0) {
      this.images = [];
      this.imagePreviews = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);

        this.images.push(file);
      }
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

  validateForm(): boolean {
    this.validationMessages = {};

    if (this.asset.category === '' || this.asset.category === null) {
      this.validationMessages.category = 'Please select a valid category.';
    }

    if (!this.asset.name || this.asset.name.length > 50 || !/^[a-zA-Z\s]+$/.test(this.asset.name)) {
      this.validationMessages.name = 'Asset name should contain only letters and spaces, and be less than 20 characters.';
    }

    if (!this.asset.description ) {
      this.validationMessages.name = 'Asset description is required.';
    }

    if (this.asset.price < 1 || this.asset.price > 999999 || !this.asset.price) {
      this.validationMessages.price = 'Price must be between 1 and 999999.';
    }

    if (this.asset.discount < 0 || this.asset.discount > 100 || !this.asset.discount) {
      this.validationMessages.discount = 'Discount must be between 0 and 100.';
    }

    if (this.asset.category === 'none' && (!this.newCategoryName || this.newCategoryName.trim() === '')) {
      this.validationMessages.newCategoryName = 'Please provide a name for the new category.';
    }

    if (this.isUtility) {
      if (!this.utilityReservationTerm || !this.utilityCancellationTerm) {
        this.validationMessages.utilityTerms = 'Please select both reservation and cancellation terms.';
      }

      if (this.utilityCancellationTerm > this.utilityReservationTerm) {
        this.validationMessages.utilityCancellationTerm = 'Cancellation period can not be more than reservation period.';
      }

      if (this.utilityDuration < 1 || this.utilityDuration > 999 || !this.utilityDuration) {
        this.validationMessages.utilityDuration = 'Duration must be between 1 and 999.';
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
        formData.append('images', imageFile, imageFile.name);
      }
    }

    if (this.asset.category === 'none') {
      formData.append('category', "00000000-0000-0000-0000-000000000000");
    } else {
      formData.append('category', this.asset.category);
    }
    formData.append('name', this.asset.name);
    formData.append('description', this.asset.description);
    formData.append('price', this.asset.price.toString());
    formData.append('discount', this.asset.discount.toString());
    formData.append('visible', this.asset.visible.toString());
    formData.append('available', this.asset.available.toString());
    formData.append('provider', this.authService.getUserId());
    formData.append('suggestedCategoryName', this.newCategoryName);
    formData.append('suggestedCategoryDesc', this.newCategoryDescription);

    if (this.isUtility) {
      formData.append('duration', this.utilityDuration.toString());
      formData.append('reservationTerm', this.utilityReservationTerm);
      formData.append('cancellationTerm', this.utilityCancellationTerm);
      formData.append('manuelConfirmation', this.utilityManualConfirmation.toString());
      console.log(this.asset);
      this.utilityService.createUtility(formData).subscribe(
        (createdUtility) => {
          console.log('Utility created:', createdUtility);
          this.navigateToProfile();
        },
        (error) => {
          console.error('Error creating utility:', error);
        }
      );
    } else if (this.isProduct) {
      console.log(formData);
      this.productService.createProduct(formData).subscribe(
        (createdProduct) => {
          console.log('Product created:', createdProduct);
          this.navigateToProfile();
        },
        (error) => {
          console.error('Error creating product:', error);
        }
      );
    }
  }

  navigateToProfile(): void {
    this.router.navigate([`/profile`]);
  }
}
