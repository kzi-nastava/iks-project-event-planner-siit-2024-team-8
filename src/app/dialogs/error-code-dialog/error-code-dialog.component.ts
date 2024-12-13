import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-error-code-dialog',
  templateUrl: './error-code-dialog.component.html',
  styleUrl: './error-code-dialog.component.css'
})
export class ErrorCodeDialogComponent {
  text: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { errorCode: number }) {}
  ngOnInit() {
    console.log(this.data.errorCode);
    if (this.data.errorCode == 409) {
      this.text = "There is already a user with that e-mail!"
    } else if (this.data.errorCode == 404) {
      this.text = "Bad request: make sure the data is correct!"
    } else {
      this.text = "Catastrophic error: try again later!"
    }
  }
}
