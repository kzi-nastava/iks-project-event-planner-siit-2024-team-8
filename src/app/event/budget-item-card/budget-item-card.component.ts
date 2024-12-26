import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BudgetItem } from '../domain/budgetItem';
import { AssetCategoryService } from '../../services/asset-category-service';
import { AssetCategory } from '../../model/asset-category';
import { BudgetService } from '../../services/budget-service';
import {MatDialog} from '@angular/material/dialog';
import {
  BoughtAssetsPopupComponent
} from '../bought-assets-popup/bought-assets-popup.component';

@Component({
  selector: 'app-budget-item-card',
  templateUrl: './budget-item-card.component.html',
  styleUrls: ['./budget-item-card.component.css'],
})
export class BudgetItemCardComponent implements OnInit {
  @Input() budgetItem: BudgetItem;
  @Output() clicked: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() updated: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();

  category: AssetCategory;

  constructor(
    private assetCategoryService: AssetCategoryService,
    private budgetService: BudgetService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.budgetItem.assetCategoryId) {
      this.fetchCategory();
    }
  }

  fetchCategory(): void {
    this.assetCategoryService.getCategoryById(this.budgetItem.assetCategoryId).subscribe(
      (category: AssetCategory) => {
        this.category = category;
      },
      (error) => {
        console.error('Failed to fetch category:', error);
      }
    );
  }

  onBudgetItemClicked(): void {
    this.clicked.emit(this.budgetItem);
  }

  onSave(): void {
    this.budgetService.updateBudgetItem(this.budgetItem.id, this.budgetItem.plannedAmount).subscribe(
      (updatedItem) => {
        this.updated.emit(updatedItem);
        console.log('Budget item updated successfully');
      },
      (error) => {
        console.error('Failed to update budget item:', error);
      }
    );
  }

  onDelete(): void {
    this.budgetService.deleteBudgetItem(this.budgetItem.id).subscribe(
      () => {
        this.deleted.emit(this.budgetItem.id);
        console.log('Budget item deleted successfully');
      },
      (error) => {
        console.error('Failed to delete budget item:', error);
      }
    );
  }

  openBoughtAssetsModal(): void {
    const assetIds = this.budgetItem.assetIds;
    const categoryType = this.category.type;

    const dialogRef = this.dialog.open(BoughtAssetsPopupComponent, {
      data: { assetIds, categoryType },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Bought assets modal closed');
    });
  }
}
