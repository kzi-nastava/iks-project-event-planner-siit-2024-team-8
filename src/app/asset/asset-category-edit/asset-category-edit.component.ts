import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-asset-category-edit',
  templateUrl: './asset-category-edit.component.html',
  styleUrls: ['./asset-category-edit.component.css']
})
export class AssetCategoryEditComponent {
  categoryName: string = '';
  categoryDescription: string = '';
  type: string = 'Product';  
  isEditMode: boolean;
  isApproveMode: boolean; // New flag to check for approve mode
  category: any;

  @Output() saveCategory = new EventEmitter<any>();  
  @Output() deleteCategory = new EventEmitter<string>();  
  @Output() approveCategory = new EventEmitter<string>();  // New event emitter for approval

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AssetCategoryEditComponent>
  ) {
    this.isEditMode = data.isEditMode;
    this.isApproveMode = data.isApproveMode || false; // Set approval mode
    this.category = data.category;

    if (this.isEditMode && this.category) {
      this.categoryName = this.category.name;
      this.categoryDescription = this.category.description;
      this.type = this.category.type;  
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const categoryData = {
      name: this.categoryName,
      description: this.categoryDescription,
      type: this.type
    };
    console.log('Category Data:', categoryData);
    this.saveCategory.emit({ categoryData, categoryId: this.category?.id });
    this.dialogRef.close();
  }

  onDelete(): void {
    if (this.isEditMode && this.category) {
      this.deleteCategory.emit(this.category.id);
      this.dialogRef.close();
    }
  }

  onApprove(): void {
    if (this.category) {
      this.approveCategory.emit(this.category.id); // Emit approval event
      this.dialogRef.close();
    }
  }
}
