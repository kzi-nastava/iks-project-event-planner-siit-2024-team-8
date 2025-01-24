import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {CreateReportRequest} from '../../user/domain/createReportRequest';
import {UserInfoResponse} from '../../user/domain/user.info.response';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BlockedUserResponse} from '../../user/domain/blocked.user.response';

@Component({
  selector: 'app-report-user-dialog',
  templateUrl: './report-user-dialog.component.html',
  styleUrl: './report-user-dialog.component.css'
})
export class ReportUserDialogComponent {

  @Output()
  report: EventEmitter<CreateReportRequest> = new EventEmitter();

  reportRequest: CreateReportRequest;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateReportRequest,
    private dialogRef: MatDialogRef<ReportUserDialogComponent>
  ){
     this.reportRequest = data;
  }


  reportUserClicked() {
    this.report.emit(this.reportRequest);
    this.dialogRef.close();
  }
}
