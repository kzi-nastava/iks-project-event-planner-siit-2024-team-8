import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../../services/budget-service';
import { BudgetItem } from '../domain/budgetItem';
import { Budget } from '../domain/budget';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  @Output()
  closed: EventEmitter<boolean> = new EventEmitter();

  budgetItems: BudgetItem[] = [];
  newBudgetItems: BudgetItem[] = [];
  eventId: string;
  plannedBudget: number = 0;
  actualBudget: number = 0;
  budgetId: string;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id')!;
      if (this.eventId) {
        this.fetchBudget();
      } else {
        console.error('Event ID is missing');
      }
    });
  }

  fetchBudget(): void {
    this.budgetService.getBudgetByEventId(this.eventId).subscribe(
      (budget: Budget) => {
        this.budgetId = budget.id;
        this.budgetItems = budget.items;
        this.plannedBudget = budget.plannedBudget;
        this.actualBudget = budget.actualBudget;
        this.budgetItems.forEach(item => {
          console.log('Bought Assets for Item ID:', item.id, item.assetIds);
        });
        console.log(this.budgetItems);
      },
      (error) => {
        console.error('Failed to fetch budget:', error);
      }

    );
  }

  addNewBudgetItem(): void {
    const newItem: BudgetItem = {
      id: '',
      assetCategoryId: '',
      plannedAmount: 0,
      actualAmount: 0,
      deleted: false,
      assetIds: [],
    };
    this.newBudgetItems.push(newItem);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onBudgetItemClicked(item: BudgetItem) {
    // Handle budget item click
  }

  onBudgetItemUpdated(updatedItem: BudgetItem): void {
    const index = this.budgetItems.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.budgetItems[index] = updatedItem;
    } else {
      const newIndex = this.newBudgetItems.findIndex(item => item === updatedItem);
      if (newIndex !== -1) {
        this.newBudgetItems.splice(newIndex, 1);
      }
      this.budgetItems.push(updatedItem);
    }
    this.fetchBudget();
    this.successMessage = 'Budget item updated successfully.';
  }

  onBudgetItemDeleted(deletedItemId: string): void {
    this.fetchBudget();
  }

  onBudgetItemSave($event: any) {
    this.fetchBudget();
    this.successMessage = 'Budget item created successfully.';
  }

  closeClicked() {
    this.closed.emit(true);
  }
}
