import {AssetCategory} from './asset-category';

export interface AssetResponse{
  id: string
  name: string;
  type: string;
  images: string[];
  category: AssetCategory;
}
