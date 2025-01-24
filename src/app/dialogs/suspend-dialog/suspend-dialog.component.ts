import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-suspend-dialog',
  templateUrl: './suspend-dialog.component.html',
  styleUrl: './suspend-dialog.component.css'
})
export class SuspendDialogComponent {

  email : string = '';

  constructor(public dialogRef: MatDialogRef<SuspendDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {
    this.email = data;
  }
}
