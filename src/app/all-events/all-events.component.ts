import { Component } from '@angular/core';
import {EventDTO} from '../event/domain/EventDTO.model';
import {Asset} from '../model/asset';
import {EventService} from '../event/event.service';
import {AssetService} from '../asset/asset.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent {
  events : EventDTO[];
  assets : Asset[];

  constructor(private eventService : EventService,private assetService: AssetService) {}

  onEventClicked : (event : EventDTO) => void;

  ngOnInit() {
    this.events = this.eventService.getAll();
    this.assets = this.assetService.getAll();
    this.updatePageData();
    this.updatePageNumbers();
  }
  pageSize = 6;
  pageIndex = 0;
  totalItems : number = 90;
  totalPages: number = Math.ceil(this.totalItems / this.pageSize)
  currentPageEvents: any[] = [];
  pageNumbers: any[] = [];
  isFilterVisible: boolean = false;

  updatePageData(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }

    this.currentPageEvents = this.events.slice(
      this.pageIndex * this.pageSize,
      (this.pageIndex + 1) * this.pageSize
    );
  }

  updatePageNumbers(): void {
    const pageNumbers: (number | string)[] = [];
    const firstPage = 0;
    const lastPage = this.totalPages - 1;

    // Always show the first page
    pageNumbers.push(firstPage);

    // Add ellipsis and surrounding pages based on the current page
    if (this.pageIndex > 1) {
      pageNumbers.push('...');
    }

    // Add a range of pages around the current page
    for (let i = Math.max(1, this.pageIndex - 1); i <= Math.min(this.pageIndex + 1, lastPage - 1); i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis for skipped pages at the end
    if (this.pageIndex < lastPage - 1) {
      pageNumbers.push('...');
    }

    // Always show the last page
    if (lastPage > 0) {
      pageNumbers.push(lastPage);
    }

    this.pageNumbers = pageNumbers;
  }
  setPage(pageNumber: number): void {
    this.pageIndex = pageNumber;
    this.updatePageData();
    this.updatePageNumbers();
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePageData();
      this.updatePageNumbers();
    }
  }

  nextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.updatePageData();
      this.updatePageNumbers();
    }
  }

  onClickFilterButton() {
    this.isFilterVisible = true;
  }
}
