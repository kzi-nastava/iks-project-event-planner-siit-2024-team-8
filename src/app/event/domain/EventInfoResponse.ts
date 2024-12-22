export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface EventInfoResponse {
  id: string,
  name: string,
  description: string,
  capacity: number,
  isPrivate: boolean,
  location: Location,
  organizerName: string,
  startDate: string,
  endDate: string
}
