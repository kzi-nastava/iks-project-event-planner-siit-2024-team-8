import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BudgetItem } from '../domain/budgetItem';
import { AssetCategoryService } from '../../services/asset-category-service';
import { AssetCategory } from '../../model/asset-category';

@Component({
  selector: 'app-budget-item-card',
  templateUrl: './budget-item-card.component.html',
  styleUrls: ['./budget-item-card.component.css'],
})
export class BudgetItemCardComponent implements OnInit {
  @Input() budgetItem: BudgetItem;
  @Output() clicked: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();

  category: AssetCategory;

  constructor(private assetCategoryService: AssetCategoryService) {}

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
}
