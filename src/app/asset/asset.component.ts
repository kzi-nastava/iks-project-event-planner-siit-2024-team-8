import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
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
  service: Asset = {
    name: 'Luxury Spa Treatment',
    type: AssetType.SERVICE, 
    description: 'A relaxing spa treatment that includes a full body massage, facial, and aromatherapy.',
    category: 'Health & Wellness',
    price: 150,
    discount: 10, 
    images: [
      'https://via.placeholder.com/800x500.png?text=Luxury+Spa+1',
      'https://via.placeholder.com/800x500.png?text=Luxury+Spa+2'
    ],
    eventTypes: ['Private', 'Group'],  
    visibility: true,
    availability: true,
    duration: 2,  
    bookingDeadline: '2024-12-15',
    cancellationDeadline: '2024-12-10',
    confirmationMethod: 'manual',  
  };

  showNewCategoryField = false;

  images: string[] = ['https://via.placeholder.com/800x500.png?text=Default+Image'];
  currentImageIndex: number = 0;

  constructor(
    private router: Router, 
    private dialog: MatDialog, 
    private assetService: AssetService
  ) {}

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
