import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BudgetItem } from '../domain/budgetItem';
import { AssetCategoryService } from '../../services/asset-category-service';
import { AssetCategory } from '../../model/asset-category';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-budget-item-card-edit',
  templateUrl: './budget-item-card-edit.component.html',
  styleUrls: ['./budget-item-card-edit.component.css']
})
export class BudgetItemCardEditComponent implements OnInit {
  @Input() budgetItem: BudgetItem;
  @Output() delete: EventEmitter<String> = new EventEmitter<String>();

  assetType: string;
  assetCategories: AssetCategory[] = [];

  constructor(private assetCategoryService: AssetCategoryService) {}

  ngOnInit(): void {
    if (this.budgetItem.assetCategoryId) {
      this.determineAssetType().subscribe(
        (assetType: string) => {
          this.assetType = assetType;
          this.fetchAssetCategories(this.assetType, this.budgetItem.assetCategoryId);
        },
        (error) => {
          console.error('Failed to determine asset type:', error);
        }
      );
    }
  }

  onAssetTypeChange(assetType: string): void {
    this.assetType = assetType;
    this.fetchAssetCategories(assetType);
    this.budgetItem.assetCategoryId = null; // Reset asset category when type changes
  }

  fetchAssetCategories(assetType: string, preselectCategoryId?: string): void {
    const fetchCategories =
      assetType === 'PRODUCT'
        ? this.assetCategoryService.getActiveProductCategories()
        : this.assetCategoryService.getActiveUtilityCategories();

    fetchCategories.subscribe(
      (categories: AssetCategory[]) => {
        this.assetCategories = categories;

        if (preselectCategoryId) {
          const matchingCategory = categories.find(
            (category) => category.id === preselectCategoryId
          );
          if (matchingCategory) {
            this.budgetItem.assetCategoryId = matchingCategory.id;
          }
        }
      },
      (error) => {
        console.error('Failed to fetch asset categories:', error);
      }
    );
  }

  onDeleteBudgetItem(): void {
    this.delete.emit(this.budgetItem.id); // Emit delete event
  }

  private determineAssetType() {
    return this.assetCategoryService.getCategoryById(this.budgetItem.assetCategoryId).pipe(
      map((assetCategory: AssetCategory) => assetCategory.type) // Get the type (product/utility)
    );
  }
}
