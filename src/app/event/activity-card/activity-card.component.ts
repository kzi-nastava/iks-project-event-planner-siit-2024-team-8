import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {Activity} from '../domain/activity';
import {Event} from '../../model/event';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.css'
})
export class ActivityCardComponent {
  @Input()
  activity : Activity;

  @Output()
  clicked : EventEmitter<Activity> = new EventEmitter<Activity>();


  onActivityClicked() {
    this.activity.isInput = true;
    this.clicked.emit(this.activity);
  }
}
