export interface SearchAssetsRequest{
  name: string;
  assetType: string;
  assetCategories: string[];
  priceLow: number;
  priceHigh: number;
  gradeLow: number;
  gradeHigh: number;
  available: boolean;
}
export function searchAssetsRequest(): SearchAssetsRequest{
  return {
    name: "",
    assetType: "",
    assetCategories: [],
    priceLow: 0,
    priceHigh: 1000,
    gradeLow: 0,
    gradeHigh: 5,
    available: true,
  }
}
