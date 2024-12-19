import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {EventType} from '../domain/event.type'

@Component({
  selector: 'app-create-event-type',
  templateUrl: './create-event-type.component.html',
  styleUrl: './create-event-type.component.css'
})
export class CreateEventTypeComponent {

  isEditMode :boolean = false;
  eventType :EventType = {
    name : "",
    description : ""
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateEventTypeData,
    private dialogRef: MatDialogRef<CreateEventTypeComponent>,
  ) {
    this.eventType = data.eventType;
    this.isEditMode = data.isEditMode;
  }

  ngOnInit() {

  }
  @Output()
  saveType: EventEmitter<EventType> = new EventEmitter();
  @Output()
  deactivateType: EventEmitter<EventType> = new EventEmitter();
  @Output()
  activateType: EventEmitter<EventType> = new EventEmitter();
  @Output()
  editType: EventEmitter<any> = new EventEmitter();

  onCancel(): void {
    this.dialogRef.close();
  }

  onDeactivate() {
    this.dialogRef.close();
    if (this.eventType.name !== "" && this.eventType.description !== ""){
      console.log("emitting...", this.eventType);
      this.deactivateType.emit(
        this.eventType
      );
    }else{
      console.log("Sum wrong")
    }
  }

  onSave() {
    this.dialogRef.close();
    if (this.eventType.name !== "" && this.eventType.description !== ""){
      this.saveType.emit(
        this.eventType
      );
    }
  }

  onActivate() {
    this.dialogRef.close();
    if (this.eventType.name !== "" && this.eventType.description !== ""){
      this.activateType.emit(
        this.eventType
      );
    }
  }
}
export interface CreateEventTypeData {
  eventType : EventType;
  isEditMode :boolean;
}
