import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AssetService } from './asset.service';
import { Asset, AssetType } from '../model/asset';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {
  service: Asset ;
  assetID: string;
  showNewCategoryField = false;

  images: string[] = ['https://via.placeholder.com/800x500.png?text=Default+Image'];
  currentImageIndex: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private assetService: AssetService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.assetID = (params.get('id'));
    });
    this.service = this.assetService.get(parseInt(this.assetID));
  }
  prevImage(): void {
    if (this.currentImageIndex > 0) this.currentImageIndex--;
  }

  nextImage(): void {
    if (this.currentImageIndex < this.images.length - 1) this.currentImageIndex++;
  }

  onSubmit(): void {
    console.log('Form submitted with data:', this.service);
    this.assetService.addAsset(this.service);
  }

  navigateToEditAsset(): void {
    this.assetService.setSelectedAsset(this.service);
    this.router.navigate(['/edit-asset']);
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteItem();
      }
    });
  }

  deleteItem() {
    console.log('Item deleted!');
  }

  editAsset(asset: any): void {
    this.assetService.setSelectedAsset(asset);
    this.router.navigate(['/edit-asset']);
  }
}
