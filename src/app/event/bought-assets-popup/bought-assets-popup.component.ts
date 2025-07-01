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
  boughtAssets: { versionId: string, asset: Product | Utility }[] = [];
  protected hasAssets: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<BoughtAssetsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { assetIds: string[], categoryType: string, eventId: string },
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
          return this.productService.getProductVersionById(assetId).toPromise();
        } else if (this.data.categoryType === 'UTILITY') {
          return this.utilityService.getUtilityVersionById(assetId).toPromise();
        } else {
          return Promise.resolve(null);
        }
      });

      Promise.all(assetRequests).then((assets) => {
        this.boughtAssets = assets
          .map((asset, index) => {
            if (!asset) return null;
            return {
              versionId: this.data.assetIds[index], // original version ID
              asset: asset
            };
          })
          .filter((entry) => entry !== null);

        this.hasAssets = this.boughtAssets.length > 0;
      });
    } else {
      this.hasAssets = false;
      this.boughtAssets = [];
    }
  }

  onAssetClick(entry: { versionId: string, asset: Product | Utility }): void {
    const {versionId, asset} = entry;
    const eventId = this.data.eventId;

    let route: string;

    if ((asset as Utility).duration) {
      route = `/events/${eventId}/assets/utilities/version/${versionId}`;
    } else {
      route = `/events/${eventId}/assets/products/version/${versionId}`;
    }

    this.router.navigate([route]);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
