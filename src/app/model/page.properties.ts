export interface PageProperties {
  page: number;
  pageSize: number;
  totalCount: number;
  pageSizeOptions: number[];
  sortBy: string | null;
  sortOrder: 'asc' | 'desc' | null;
}
