import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ReportService} from '../../services/report-service';
import {ReportResponse} from '../../model/report';
import {PageEvent} from '@angular/material/paginator';
import {ToastService} from '../../services/toast-service';
import {UserService} from '../user-service';
import {ApiResponse} from '../../model/api.response';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  reports : Report[];

  constructor(private reportsService: ReportService,
              private toastService: ToastService,
              private userService: UserService,) {}

  pageProperties = {
    page: 0,
    pageSize: 10,
    totalCount: 0,
    pageSizeOptions: [10, 15, 20]
  };

  selectedRowIndex: number = -1;

  currentReports: ReportResponse[] = [];
  displayedColumns: string[] = ['userEmail', 'reportedEmail', 'reason', 'date'];

  ngOnInit() {
    this.reportsService.getReports(this.pageProperties).subscribe(response => {
       this.currentReports = response.content;
       this.pageProperties.totalCount = response.totalElements;
    })
  }

  pageChanged($event: PageEvent) {
    this.pageProperties.page = $event.pageIndex;
    this.pageProperties.pageSize = $event.pageSize;
    this.fetchData();

  }

  private fetchData() {
    this.reportsService.getReports(this.pageProperties).subscribe(response => {
      this.currentReports = response.content;
      this.pageProperties.totalCount = response.totalElements;
    })
  }

  onButtonClick() {
    if (this.selectedRowIndex === -1) {this.toastService.showErrorToast("No row is clicked!"); return;}

    console.log(this.selectedRowIndex);
    console.log(this.currentReports.at(this.selectedRowIndex));
    this.userService.suspendUser(this.currentReports.at(this.selectedRowIndex).id).subscribe({
      next: (response: ApiResponse) => {
        this.toastService.showSuccessToast(response.message);
      },error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.toastService.showErrorToast("Report not found!");
        }
      }
    })
  }

  onRowClick(index: number): void {
    this.selectedRowIndex = index;
  }
}
