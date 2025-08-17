import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EventService} from '../../services/event-service';
import {EventInfoResponse} from '../../event/domain/EventInfoResponse';
import {ToastService} from '../../services/toast-service';
import {BudgetService} from '../../services/budget-service';
import {CreateReservationRequest, returnCreateReservationRequest} from '../dto/create.reservation.request';
import {Utility} from '../../model/utility';
@Component({ selector: 'app-reservation-date-time-component',
  templateUrl: './reservation-date-time-component.component.html',
  styleUrl: './reservation-date-time-component.component.css' })
export class ReservationDateTimeComponentComponent {
    selectedDate: Date = null;
    selectedTime: String = "";
    startDate : Date = new Date();
    endDate : Date = new Date();
    request : CreateReservationRequest = returnCreateReservationRequest();
  component: any;
    ngOnInit(): void {}

    constructor( private dialogRef: MatDialogRef<ReservationDateTimeComponentComponent>,
                 @Inject(MAT_DIALOG_DATA) public data: { event : EventInfoResponse , utility : Utility },
                 private eventService: EventService,
                 private toastService : ToastService,
                 private budgetService: BudgetService, ) {
      if (!this.data.event) return;
      this.startDate = new Date(this.data.event.startDate)
      this.endDate = new Date(this.data.event.endDate) }

  reserveUtility() {
    if (!this.selectedDate || !this.selectedTime || this.selectedTime.trim() === "") {
        this.toastService.showErrorToast("Date and time must be filled!")
      return; }
    if (!this.data?.event) {
        this.toastService.showErrorToast('Event not provided!');
        return; }
    if (!this.data?.utility) {
        this.toastService.showErrorToast('Utility not provided!');
        return;
    }
    this.request = { date : this.selectedDate.toISOString(),
      time : this.selectedTime.toString(),
      utilityId : this.data.utility.id,
      eventId : this.data.event.id }
    this.budgetService.reserveUtility(this.request).subscribe( (response) => {
      this.toastService.showSuccessToast('Utility successfully reserved:');
      this.dialogRef.close(); },
      (error) => {
      this.toastService.showErrorToast('Error reserving utility!');
    } )
    }
}
