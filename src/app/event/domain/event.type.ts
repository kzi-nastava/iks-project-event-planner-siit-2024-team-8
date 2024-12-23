import {AssetCategory} from '../../model/asset-category';

export interface EventType {
  id?: string;
  name :string;
  description:string;
  active?:boolean;
  assetCategories:AssetCategory[];
}
