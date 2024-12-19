import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UtilityService } from '../services/utility-service';
import { ProductService } from '../services/product-service';
import { AssetCategoryService } from '../services/asset-category-service';
import { AssetCategory } from '../model/asset-category';
import { Asset } from '../model/asset';
import {AuthService} from '../infrastructure/auth/auth.service';
import {UserService} from '../user/user-service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  asset: Asset;
  assetID: string;
  isUtility: boolean = false;
  isProduct: boolean = false;
  categoryName: string = ''; // Store category name here

  images: string[] = ['https://via.placeholder.com/800x500.png?text=Default+Image'];
  currentImageIndex: number = 0;

  // Utility specific properties
  utilityDuration: number;
  utilityReservationTerm: string;
  utilityCancellationTerm: string;
  utilityManualConfirmation: boolean;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private dialog: MatDialog,
      private utilityService: UtilityService,
      private productService: ProductService,
      private assetCategoryService: AssetCategoryService,
      private authService: AuthService,
      private userService: UserService,
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.assetID = params.get('id');
      if (this.assetID) {
        this.fetchAssetData();
      }
    });
  }

  fetchAssetData(): void {
    const url = this.router.url;

    if (url.includes('utilities')) {
      this.isUtility = true;
      this.isProduct = false;
      this.utilityService.getUtilityById(this.assetID).subscribe(
          (utility) => {
            this.asset = utility;
            this.images = utility.images || this.images;

            this.utilityDuration = utility.duration;
            this.utilityReservationTerm = utility.reservationTerm;
            this.utilityCancellationTerm = utility.cancellationTerm;
            this.utilityManualConfirmation = utility.manuelConfirmation;

            if (utility.category) {
              this.fetchCategory(utility.category);
            }
          },
          (error) => console.error('Error fetching utility:', error)
      );
    } else if (url.includes('products')) {
      this.isProduct = true;
      this.isUtility = false;
      this.productService.getProductById(this.assetID).subscribe(
          (product) => {
            this.asset = product;
            this.images = product.images || this.images;

            if (product.category) {
              this.fetchCategory(product.category);
            }
          },
          (error) => console.error('Error fetching product:', error)
      );
    }
  }

  fetchCategory(categoryId: string): void {
    this.assetCategoryService.getCategoryById(categoryId).subscribe(
        (category: AssetCategory) => {
          this.categoryName = category.name || 'No Category';
        },
        (error) => {
          console.error('Error fetching category:', error);
          this.categoryName = 'Category not found';
        }
    );
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) this.currentImageIndex--;
  }

  nextImage(): void {
    if (this.currentImageIndex < this.images.length - 1) this.currentImageIndex++;
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteItem();
      }
    });
  }

  deleteItem(): void {
    if (this.isUtility) {
        this.utilityService.deleteUtility(this.assetID).subscribe()
    } else {
        this.productService.deleteProduct(this.assetID).subscribe()
    }
  }

  navigateToEditAsset(): void {
     if (this.isUtility) {
        this.router.navigate([`/assets/utilities/${this.assetID}/edit`]);
     } else if (this.isProduct) {
        this.router.navigate([`/assets/products/${this.assetID}/edit`]);
     }
    }
}
