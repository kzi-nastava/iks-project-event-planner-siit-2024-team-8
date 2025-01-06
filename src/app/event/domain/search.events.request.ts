import {EventType} from './event.type';

export interface SearchEventsRequest{
  name: string;
  eventTypes: string[];
  lowerCapacity: number;
  upperCapacity: number;
  startDate: string;
  endDate: string;
}

export function returnSearchEventsRequest(): SearchEventsRequest{
  return {
    name : "",
    eventTypes: [],
    lowerCapacity: 0,
    upperCapacity: 1000000,
    startDate: "",
    endDate: ""
  }
}
