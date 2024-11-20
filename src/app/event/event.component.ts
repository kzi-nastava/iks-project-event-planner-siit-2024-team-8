import { Component } from '@angular/core';
import { Event } from '../model/event'; 

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'] 
})
export class EventComponent {
  event: Event = {
    name: '',
    description: '',
    capacity: 0,
    isPrivate: false,
    startDate: '', 
    endDate: '',
    budget: 0.0,
    images: [
      'https://via.placeholder.com/800x500.png?text=Event+1',
      'https://via.placeholder.com/800x500.png?text=Event+2'] 
  };

  currentImageIndex = 0;

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.event.images.length) % this.event.images.length;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.event.images.length;
  }

  openDeleteDialog() {
    
  }

  navigateToEditEvent() {
    
  }
}
