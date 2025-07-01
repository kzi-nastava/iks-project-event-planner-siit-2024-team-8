export interface BudgetItem {
  id: string;
  assetCategoryId: string;
  plannedAmount: number;
  actualAmount: number;
  deleted: boolean;
  assetVersionIds: string[];
  eventId?: string;
}
