export interface EventUpdateRequest {
  id: string,
  name: string,
  description: string,
  location: Location,
  capacity: number,
  startDate: Date,
  endDate: Date,
}
