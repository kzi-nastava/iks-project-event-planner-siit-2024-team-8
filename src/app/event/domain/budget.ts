import {BudgetItem} from './budgetItem';

export interface Budget {
  id: string;
  plannedBudget: number;
  actualBudget: number;
  deleted: boolean;
  items: BudgetItem[];
}
