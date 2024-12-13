
export interface Asset {
  id?: string;
  category: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  grade: number;
  images: string[];
  possibleEventTypes: string[]; // List of EventType IDs
  visible: boolean;
  available: boolean;
  status: string;
  deleted: boolean;
  providerId: string;
}
