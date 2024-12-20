import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AssetCategoryEditComponent } from '../asset-category-edit/asset-category-edit.component';
import { AssetCategoryService } from '../../services/asset-category-service';
import { AssetCategory } from '../../model/asset-category';

@Component({
  selector: 'app-asset-categories',
  templateUrl: './asset-categories.component.html',
  styleUrls: ['./asset-categories.component.css']
})
export class AssetCategoriesComponent implements OnInit {
  assetCategories: AssetCategory[] = [];
  pendingCategories: AssetCategory[] = [];
  pageSize = 15;
  pageIndex = 0;
  totalItems: number = 0;
  currentPageCategories: AssetCategory[] = [];
  pendingPageCategories: AssetCategory[] = [];
  carouselIndex = 0;

  constructor(
    private dialog: MatDialog,
    private assetCategoryService: AssetCategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadPendingCategories();
  }

  loadCategories(): void {
    this.assetCategoryService.getActiveCategories().subscribe(
      (data: AssetCategory[]) => {
        this.assetCategories = data;
        this.totalItems = this.assetCategories.length;
        this.updatePageData();
      },
      error => {
        console.error('Error loading categories', error);
      }
    );
  }

  loadPendingCategories(): void {
    this.assetCategoryService.getPendingCategories().subscribe(
      (data: AssetCategory[]) => {
        this.pendingCategories = data;
        this.updateCarouselData();
      },
      error => {
        console.error('Error loading pending categories', error);
      }
    );
  }

  updateCarouselData(): void {
    const startIndex = this.carouselIndex * 5;
    const endIndex = startIndex + 5;
    this.pendingPageCategories = this.pendingCategories.slice(startIndex, endIndex);
  }

  navigateCarousel(direction: 'left' | 'right'): void {
    if (direction === 'left' && this.carouselIndex > 0) {
      this.carouselIndex--;
    } else if (direction === 'right' && this.carouselIndex < Math.floor(this.pendingCategories.length / 5)) {
      this.carouselIndex++;
    }
    this.updateCarouselData();
  }

  updatePageData(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex;
    }

    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.currentPageCategories = this.assetCategories.slice(startIndex, endIndex);
  }

  openEditDialog(category: AssetCategory, isApproveMode: boolean = false): void {
    const dialogRef = this.dialog.open(AssetCategoryEditComponent, {
      width: '400px',
      data: {
        category: category,
        isEditMode: !isApproveMode,
        isApproveMode: isApproveMode
      }
    });

    dialogRef.componentInstance.saveCategory.subscribe((result: any) => {
      this.saveCategory(result.categoryData, result.categoryId);
    });

    dialogRef.componentInstance.deleteCategory.subscribe((categoryId: string) => {
      this.deleteCategory(categoryId);
    });

    dialogRef.componentInstance.approveCategory.subscribe((categoryId: string) => {
      this.approveCategory(categoryId);
    });
  }

  onAddCategoryClick(): void {
    const dialogRef = this.dialog.open(AssetCategoryEditComponent, {
      width: '400px',
      data: { category: { name: '', description: '', type: 'Product' }, isEditMode: false }
    });

    dialogRef.componentInstance.saveCategory.subscribe((result: any) => {
      this.createCategory(result.categoryData);
    });
  }

  approveCategory(categoryId: string): void {
    this.assetCategoryService.approveCategory(categoryId).subscribe(
      () => {
        this.loadPendingCategories();
      },
      error => {
        console.error('Error approving category', error);
      }
    );
  }


  saveCategory(categoryData: any, categoryId: string | undefined): void {
    if (categoryId) {
      this.assetCategoryService.updateCategory(categoryId, categoryData).subscribe(
        updatedCategory => {
          const index = this.assetCategories.findIndex(c => c.id === updatedCategory.id);
          if (index > -1) {
            this.assetCategories[index] = updatedCategory;
          }
          this.totalItems = this.assetCategories.length;
          this.updatePageData();
        },
        error => {
          console.error('Error updating category', error);
        }
      );
    }
  }

  createCategory(categoryData: any): void {
    console.log('Category Data:', categoryData);
    this.assetCategoryService.createCategory(categoryData).subscribe(
      newCategory => {
        this.assetCategories.push(newCategory);
        this.totalItems = this.assetCategories.length;
        this.updatePageData();
      },
      error => {
        console.error('Error creating category', error);
      }
    );
  }

  deleteCategory(categoryId: string): void {
    this.assetCategoryService.deleteCategory(categoryId).subscribe(
      () => {
        this.assetCategories = this.assetCategories.filter(c => c.id !== categoryId);
        this.totalItems = this.assetCategories.length;
        this.updatePageData();
      },
      error => {
        console.error('Error deleting category', error);
      }
    );
  }
}
