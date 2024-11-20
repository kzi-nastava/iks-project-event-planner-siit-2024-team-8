import { Injectable } from '@angular/core';
import {Event} from '../model/event';
import {Asset} from '../model/asset';

const events: Event[] = [
  {
    id: 1,
    name: 'Wedding Celebration',
    description: 'A beautiful wedding celebration with family and friends.',
    capacity: 150,
    isPrivate: true,
    startDate: '2024-06-01T14:00:00',
    endDate: '2024-06-01T22:00:00',
    budget: 15000.0,
    images: [
      'https://via.placeholder.com/800x500.png?text=Wedding+1',
      'https://via.placeholder.com/800x500.png?text=Wedding+2'
    ]
  },
  {
    id: 2,
    name: 'Corporate Conference 2024',
    description: 'A conference for industry leaders and professionals in the tech field.',
    capacity: 500,
    isPrivate: false,
    startDate: '2024-07-15T09:00:00',
    endDate: '2024-07-15T18:00:00',
    budget: 20000.0,
    images: [
      'https://via.placeholder.com/800x500.png?text=Conference+1',
      'https://via.placeholder.com/800x500.png?text=Conference+2'
    ]
  },
  {
    id: 3,
    name: 'Music Festival',
    description: 'An annual music festival featuring live performances from top artists.',
    capacity: 10000,
    isPrivate: false,
    startDate: '2024-08-10T12:00:00',
    endDate: '2024-08-10T23:00:00',
    budget: 50000.0,
    images: [
      'https://via.placeholder.com/800x500.png?text=Festival+1',
      'https://via.placeholder.com/800x500.png?text=Festival+2'
    ]
  },
  {
    id: 4,
    name: 'Wedding Reception at The Grand Hall',
    description: 'A stunning wedding reception in a luxurious grand hall with stunning décor.',
    capacity: 200,
    isPrivate: true,
    startDate: '2024-09-10T18:00:00',
    endDate: '2024-09-10T23:00:00',
    budget: 30000.0,
    images: [
      'https://via.placeholder.com/800x500.png?text=Reception+1',
      'https://via.placeholder.com/800x500.png?text=Reception+2'
    ]
  },
  {
    id: 5,
    name: 'Charity Gala 2024',
    description: 'A glamorous charity gala raising funds for a worthy cause.',
    capacity: 350,
    isPrivate: true,
    startDate: '2024-10-05T19:00:00',
    endDate: '2024-10-05T23:00:00',
    budget: 25000.0,
    images: [
      'https://via.placeholder.com/800x500.png?text=Gala+1',
      'https://via.placeholder.com/800x500.png?text=Gala+2'
    ]
  },
  {
    id: 6,
    name: 'Tech Innovators Expo',
    description: 'An exhibition showcasing the latest in technology and innovation.',
    capacity: 3000,
    isPrivate: false,
    startDate: '2024-11-20T10:00:00',
    endDate: '2024-11-22T17:00:00',
    budget: 60000.0,
    images: [
      'https://via.placeholder.com/800x500.png?text=Tech+Expo+1',
      'https://via.placeholder.com/800x500.png?text=Tech+Expo+2'
    ]
  },
  {
    id: 7,
    name: 'New Year’s Eve Party',
    description: 'A glamorous New Year’s Eve party with a countdown celebration.',
    capacity: 500,
    isPrivate: false,
    startDate: '2024-12-31T21:00:00',
    endDate: '2025-01-01T01:00:00',
    budget: 15000.0,
    images: [
      'https://via.placeholder.com/800x500.png?text=NYE+1',
      'https://via.placeholder.com/800x500.png?text=NYE+2'
    ]
  },
  {
    id: 8,
    name: 'Product Launch: 2025 Edition',
    description: 'A grand event to unveil the latest products from a major brand.',
    capacity: 1000,
    isPrivate: false,
    startDate: '2024-05-20T09:00:00',
    endDate: '2024-05-20T15:00:00',
    budget: 40000.0,
    images: [
      'https://via.placeholder.com/800x500.png?text=Launch+1',
      'https://via.placeholder.com/800x500.png?text=Launch+2'
    ]
  },
  {
    id: 9,
    name: 'Annual Charity Run',
    description: 'A 5K charity run to raise funds for health-related causes.',
    capacity: 500,
    isPrivate: false,
    startDate: '2024-09-25T08:00:00',
    endDate: '2024-09-25T12:00:00',
    budget: 5000.0,
    images: [
      'https://via.placeholder.com/800x500.png?text=Run+1',
      'https://via.placeholder.com/800x500.png?text=Run+2'
    ]
  },
  {
    id: 10,
    name: 'Luxury Fashion Show',
    description: 'An exclusive fashion show featuring top luxury designers.',
    capacity: 300,
    isPrivate: true,
    startDate: '2024-12-12T18:00:00',
    endDate: '2024-12-12T21:00:00',
    budget: 45000.0,
    images: [
      'https://via.placeholder.com/800x500.png?text=Fashion+Show+1',
      'https://via.placeholder.com/800x500.png?text=Fashion+Show+2'
    ]
  }
];


@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventList: Event[] = [];
  constructor() {
    for (let eventObj of events){
      const event : Event = {
        id : eventObj.id,
        name : eventObj.name,
        startDate : eventObj.startDate,
        endDate : eventObj.endDate,
        capacity : eventObj.capacity,
        description : eventObj.description,
        isPrivate: eventObj.isPrivate,
        budget : eventObj.budget,
        images : eventObj.images
      }
      this.eventList.push(event);
    }
  }
  get(id:number) : Event {
    return this.eventList.find(a => a.id === id);
  }

  getAll() : Event[]{
    return this.eventList;
  }
  add(event : Event) : void{
    this.eventList.push(event);
  }
}
