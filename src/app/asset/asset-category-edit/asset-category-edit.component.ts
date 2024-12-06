import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-asset-category-edit',
  templateUrl: './asset-category-edit.component.html',
  styleUrls: ['./asset-category-edit.component.css']
})
export class AssetCategoryEditComponent {
  categoryName: string;
  categoryDescription: string;
  isEditMode: boolean;
  category: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.isEditMode = data.isEditMode;
    this.category = data.category;

    if (this.isEditMode && this.category) {
      this.categoryName = this.category.name;
      this.categoryDescription = this.category.description;
    }
  }

  onCancel(): void {
  }

  onSave(): void {
    if (this.isEditMode) {
      // Edit logic (update category)
    } else {
      // Create logic (add new category)
    }
  }

  onDelete(): void {
    if (this.isEditMode) {
      // Delete logic
    }
  }
}