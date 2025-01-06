import {LocationDTO} from "../domain/EventUpdateRequest"

export interface EventInfoResponse {
  id: string,
  name: string,
  description: string,
  capacity: number,
  isPrivate: boolean,
  location: LocationDTO,
  organizerName: string,
  organizerID: string,
  startDate: string,
  endDate: string
}
