import {Activity} from './activity';
import {Location, returnLocation} from './location'
import {EventType} from './event.type';
import {BudgetItem} from './budgetItem';

export interface EventDTO {
  organizerID: string;
  name : string;
  description : string;
  startDate : string;
  endDate : string;
  capacity: number;
  isPrivate: boolean;
  location : Location;
  agenda: Activity[];
  eventType: EventType;
  guests? : string[];
  budgetItems: BudgetItem[];
}

export function returnEvent() : EventDTO {
  return {
    organizerID: '',
    name : "",
    description : "",
    startDate: "",
    endDate: "",
    capacity: 0,
    location: returnLocation(),
    isPrivate: false,
    eventType: null,
    agenda: [],
    guests: [],
    budgetItems: [],
  }
}
