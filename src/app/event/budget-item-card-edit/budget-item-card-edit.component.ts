import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BudgetItem } from '../domain/budgetItem';
import { AssetCategoryService } from '../../services/asset-category-service';
import { AssetCategory } from '../../model/asset-category';
import { map } from 'rxjs/operators';
import { BudgetService } from '../../services/budget-service';

@Component({
  selector: 'app-budget-item-card-edit',
  templateUrl: './budget-item-card-edit.component.html',
  styleUrls: ['./budget-item-card-edit.component.css']
})
export class BudgetItemCardEditComponent implements OnInit {
  @Input() budgetItem: BudgetItem;
  @Input() budgetId: string;
  @Input() showSaveButton: boolean = false;
  @Output() delete: EventEmitter<String> = new EventEmitter<String>();
  @Output() saved: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();

  assetType: string;
  assetCategories: AssetCategory[] = [];
  protected errorMessage: string;

  constructor(
    private assetCategoryService: AssetCategoryService,
    private budgetService: BudgetService
  ) {}

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
    this.budgetItem.assetCategoryId = null;
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
    this.delete.emit(this.budgetItem.id);
  }

  onSaveBudgetItem(): void {
    if (this.budgetItem.assetCategoryId && this.budgetItem.plannedAmount > 0) {
      const budgetItemCreateRequest: BudgetItem = {
        ...this.budgetItem,
        id: '',
      };

      this.budgetService.addBudgetItem(this.budgetId, budgetItemCreateRequest).subscribe(
        (savedBudgetItem: BudgetItem) => {
          console.log('Budget item saved:', savedBudgetItem);
          this.saved.emit(savedBudgetItem);
        },
        (error) => {
          console.error('Failed to save budget item:', error);
          if (error.status === 400 && error.error === null) {
            this.errorMessage = 'A budget item with this category already exists.';
          } else {
            this.errorMessage = 'An error occurred while saving the budget item.';
          }
        }
      );
    } else {
      console.error('Please ensure all required fields are filled correctly.');
    }
  }

  private determineAssetType() {
    return this.assetCategoryService.getCategoryById(this.budgetItem.assetCategoryId).pipe(
      map((assetCategory: AssetCategory) => assetCategory.type)
    );
  }
}

