export enum PrivacyType {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
  }

  export interface Location {
    name: string;
    latitude: number;
    longitude: number;
  }

  export interface Event {
    id:number
    name: string;
    description: string;
    capacity: number;
    isPrivate: boolean;
    startDate: string;
    endDate: string;
    budget: number;
    location?: Location;
    images: string[];
  }
