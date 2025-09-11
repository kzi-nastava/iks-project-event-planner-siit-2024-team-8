import {EventType} from './event.type';
export interface SearchEventsRequest{
  name: string;
  eventTypes: string[];
  lowerCapacity: number;
  upperCapacity: number;
  gradeLow : number;
  gradeHigh : number;
  startDate: string;
  endDate: string;
  owner : string;
}

export function returnSearchEventsRequest(): SearchEventsRequest{
  return {
    name : "",
    eventTypes: [],
    lowerCapacity: 0,
    upperCapacity: 1000000,
    gradeLow: 0,
    gradeHigh: 5,
    startDate: "",
    endDate: "",
    owner: "",
  }
}
