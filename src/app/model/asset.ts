  export enum AssetType {
    SERVICE= 'SERVICE',
    PRODUCT = 'PRODUCT',
  }

  export interface Asset{
    name:string;
    type:AssetType;
    description:string;
  }
