import { Injectable } from '@angular/core';
import {EventDTO} from './domain/EventDTO.model';

const events = [
  {
    name: "Exit",
    startDate: "2025-07-13",
    endDate: "2025-07-15",
    duration: 2
  },
  {
    name: "Meeting",
    startDate: "2025-07-18",
    endDate: "2025-07-20",
    duration: 2
  },
  {
    name: "Workshop",
    startDate: "2025-07-22",
    endDate: "2025-07-24",
    duration: 2
  },
  {
    name: "Conference",
    startDate: "2025-07-25",
    endDate: "2025-07-28",
    duration: 3
  },
  {
    name: "Seminar",
    startDate: "2025-08-01",
    endDate: "2025-08-02",
    duration: 1
  },
  {
    name: "Holiday",
    startDate: "2025-08-05",
    endDate: "2025-08-10",
    duration: 5
  },
  {
    name: "Team Building",
    startDate: "2025-08-12",
    endDate: "2025-08-14",
    duration: 2
  },
  {
    name: "Training",
    startDate: "2025-08-15",
    endDate: "2025-08-17",
    duration: 2
  },
  {
    name: "Project Launch",
    startDate: "2025-08-20",
    endDate: "2025-08-21",
    duration: 1
  },
  {
    name: "Exit Interview",
    startDate: "2025-08-23",
    endDate: "2025-08-25",
    duration: 2
  }
];

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventList: EventDTO[] = [];
  constructor() {
    for (let eventObj of events){
      const event : EventDTO = {
        name : eventObj.name,
        startDate : eventObj.startDate,
        endDate : eventObj.endDate,
        duration : eventObj.duration,
      }
      this.eventList.push(event);
    }
  }

  getAll() : EventDTO[]{
    return this.eventList;
  }
  add(event : EventDTO) : void{
    this.eventList.push(event);
  }
}
