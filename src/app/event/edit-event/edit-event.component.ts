import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../event.service';
import {EventDTO} from '../domain/EventDTO.model';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent {
  constructor(private router: Router, private eventService: EventService) {}




  // TODO
  name: string = '';
  duration: string = '';
  startDate: string = '';
  endDate: string = '';
  ngOnInit() {}







  onClickSubmit() {}
  onClickDelete() {}
  onClickBack() {
    this.router.navigate(['/home']);
  }
}
