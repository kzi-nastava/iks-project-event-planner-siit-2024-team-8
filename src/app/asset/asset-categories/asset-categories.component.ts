import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AssetCategoryEditComponent } from '../asset-category-edit/asset-category-edit.component';

interface AssetCategory {
  name: string;
  description: string;
}

@Component({
  selector: 'app-asset-categories',
  templateUrl: './asset-categories.component.html',
  styleUrls: ['./asset-categories.component.css']
})
export class AssetCategoriesComponent implements OnInit {
  assetCategories: AssetCategory[] = [
    { name: 'Electronics', description: 'Devices and gadgets like computers, TVs, etc.' },
    { name: 'Furniture', description: 'Various furniture items such as chairs, tables, etc.' },
    { name: 'Tools', description: 'Equipment used for construction and repairs.' },
    { name: 'Clothing', description: 'Apparel for different occasions.' },
    { name: 'Books', description: 'Reading materials including fiction, non-fiction, etc.' },
    { name: 'Toys', description: 'Play items for children of all ages.' },
  ];

  pageSize = 15; 
  pageIndex = 0;
  totalItems: number = this.assetCategories.length;
  currentPageCategories: AssetCategory[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.updatePageData();
  }

  updatePageData(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex;
    }

    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.currentPageCategories = this.assetCategories.slice(startIndex, endIndex);

    while (this.currentPageCategories.length < this.pageSize) {
      this.currentPageCategories.push({ name: '', description: '' });
    }
  }

  openEditDialog(category: AssetCategory): void {
    const dialogRef = this.dialog.open(AssetCategoryEditComponent, {
      width: '400px',
      data: { category: category, isEditMode: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.assetCategories.findIndex(c => c.name === category.name);
        if (index > -1) {
          this.assetCategories[index] = result;
        }
      }
    });
  }

  onAddCategoryClick(): void {
    const dialogRef = this.dialog.open(AssetCategoryEditComponent, {
      width: '400px',
      data: { category: { name: '', description: '' }, isEditMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assetCategories.push(result);
        this.totalItems = this.assetCategories.length;
        this.updatePageData(); 
      }
    });
  }
}