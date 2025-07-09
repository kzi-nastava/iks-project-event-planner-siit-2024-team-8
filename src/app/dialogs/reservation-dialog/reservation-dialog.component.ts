import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css'
})
export class ReservationDialogComponent {
  constructor(private dialogRef: MatDialogRef<ReservationDialogComponent>) {}

  confirm(): void {
    this.dialogRef.close('accept');
  }

  deny(): void {
    this.dialogRef.close('deny');
  }

  close(): void {
    this.dialogRef.close(null); // Just close, no action
  }
}
