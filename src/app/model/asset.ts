export enum AssetType {
  SERVICE = 'SERVICE',
  PRODUCT = 'PRODUCT',
}

export interface Asset {
  id: number;
  name: string;
  type: AssetType;
  description: string;
  category: string;
  price: number;
  discount: number;
  images: string[];
  eventTypes: string[];
  visibility: boolean;
  availability: boolean;
  duration: number;
  bookingDeadline: string;
  cancellationDeadline: string;
  confirmationMethod: string;
  newCategory?: string;
}
