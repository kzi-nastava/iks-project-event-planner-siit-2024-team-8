import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product-service';
import { UtilityService } from '../../services/utility-service';
import { Product } from '../../model/product';
import { Utility } from '../../model/utility';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bought-assets-popup',
  templateUrl: './bought-assets-popup.component.html',
  styleUrls: ['./bought-assets-popup.component.css'],
})
export class BoughtAssetsPopupComponent {
  boughtAssets: (Product | Utility)[] = [];
  protected hasAssets: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<BoughtAssetsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { assetIds: string[], categoryType: string },
    private productService: ProductService,
    private utilityService: UtilityService,
    private router: Router
  ) {
    this.loadBoughtAssets();
  }

  loadBoughtAssets(): void {
    if (this.data.assetIds && Array.isArray(this.data.assetIds) && this.data.assetIds.length > 0) {
      const assetRequests = this.data.assetIds.map((assetId) => {
        if (this.data.categoryType === 'PRODUCT') {
          return this.productService.getProductById(assetId).toPromise();
        } else if (this.data.categoryType === 'UTILITY') {
          return this.utilityService.getUtilityById(assetId).toPromise();
        } else {
          return Promise.resolve(null);
        }
      });

      Promise.all(assetRequests).then((assets) => {
        this.boughtAssets = assets.filter((asset) => asset !== null);
        this.hasAssets = this.boughtAssets.length > 0;
      });
    } else {
      this.hasAssets = false;
      this.boughtAssets = [];
    }
  }

  onAssetClick(asset: Product | Utility): void {
    if ((asset as Utility).duration) {
      this.router.navigate([`/assets/utilities/${asset.id}`]);
    } else {
      this.router.navigate([`/assets/products/${asset.id}`]);
    }
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
