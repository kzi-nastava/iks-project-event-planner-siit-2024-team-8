export interface BudgetItem {
  id: string;
  assetCategoryId: string;
  plannedAmount: number;
  actualAmount: number;
  deleted: boolean;
  assetIds: string[];
}
