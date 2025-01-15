export interface PriceListItem {
  assetId: string;
  name: string;
  price: number;
  discount: number;
  discountedPrice: number;
  editMode?: boolean;
}
