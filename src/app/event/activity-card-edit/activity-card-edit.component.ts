import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Activity} from '../domain/activity';

@Component({
  selector: 'app-activity-card-edit',
  templateUrl: './activity-card-edit.component.html',
  styleUrl: './activity-card-edit.component.css'
})
export class ActivityCardEditComponent {
  // Form fields
  @Input()
  activity : Activity;

  @Output()
  clicked : EventEmitter<Activity> = new EventEmitter<Activity>();

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  // Open the start time picker
  openStartTimePicker(): void {
    // Logic to open a time picker
    const selectedTime = prompt('Select Start Time (HH:MM):', this.activity.startTime);
    if (selectedTime) {
      this.activity.startTime= selectedTime;
    }
  }

  // Open the end time picker
  openEndTimePicker(): void {
    // Logic to open a time picker
    const selectedTime = prompt('Select End Time (HH:MM):', this.activity.endTime);
    if (selectedTime) {
      this.activity.endTime = selectedTime;
    }
  }

  // Save Activity
  saveActivity(): void {
    if (this.validateInputs()) {
      console.log('Activity Saved:', {
        title: this.activity.name,
        location: this.activity.place,
        startTime: this.activity.startTime,
        endTime: this.activity.endTime,
        description: this.activity.description
      });
      alert('Activity saved successfully!');
    }
  }

  // Validate inputs
  private validateInputs(): boolean {
    console.log(this.activity);
    if (!this.activity.name) {
      alert('Activity title is required!');
      return false;
    }
    if (!this.activity.endTime) {
      alert('Activity location is required!');
      return false;
    }
    if (!this.activity.startTime) {
      alert('Activity start time is required!');
      return false;
    }
    if (!this.activity.endTime) {
      alert('Activity end time is required!');
      return false;
    }
    return true;
  }

  onSaveActivity() {
    if (this.validateInputs()) {
      console.log('Activity Saved:', {
        title: this.activity.name,
        location: this.activity.place,
        startTime: this.activity.startTime,
        endTime: this.activity.endTime,
        description: this.activity.description,
      });
      this.activity.isInput = false;
      this.clicked.emit(this.activity);
    }
  }

  onDeleteClick() {
    this.delete.emit(this.activity.index);
  }
}
