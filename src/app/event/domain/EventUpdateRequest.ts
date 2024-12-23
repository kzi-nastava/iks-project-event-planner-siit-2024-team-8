export interface LocationDTO {
  id: string;
  latitude: number;
  longitude: number;
  city: string;
  street: string;
}

export interface EventUpdateRequest {
  id: string,
  name: string,
  description: string,
  location: LocationDTO,
  capacity: number,
  startDate: string,
  endDate: string,
}
