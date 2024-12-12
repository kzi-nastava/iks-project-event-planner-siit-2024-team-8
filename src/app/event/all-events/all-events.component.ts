import { Component } from '@angular/core';
import {EventDTO} from '../domain/EventDTO.model';
import {Asset} from '../../model/asset';
import {Event} from '../../model/event';
import {EventService} from '../event.service';
import {AssetService} from '../../asset/asset.service';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent {
  events : Event[];
  assets : Asset[];
  filterType: string = '';

  constructor(private router: Router,private eventService : EventService,private assetService: AssetService) {}


  ngOnInit() {
    this.checkRoute();
    this.events = this.eventService.getAll();
    this.assets = this.assetService.getAll();
    this.updatePageData();
    this.updatePageNumbers();
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  //paging mechanism
  pageSize = 6;
  pageIndex = 0;
  totalItems : number = 90;
  totalPages: number = Math.ceil(this.totalItems / this.pageSize)
  currentPageEvents: any[] = [];
  pageNumbers: any[] = [];

  //filter visibility
  isFilterVisible: boolean = false;

  //current order
  ascending: boolean = true;

  //Events Page?
  isEvents: boolean;
  isMyAssets: boolean = false;

  updatePageData(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }

    if(this.isEvents){
      this.currentPageEvents = this.events.slice(
        this.pageIndex * this.pageSize,
        (this.pageIndex + 1) * this.pageSize
      );
    }else{
      this.currentPageEvents = this.assets.slice(
        this.pageIndex * this.pageSize,
        (this.pageIndex + 1) * this.pageSize
      );
    }

  }

  updatePageNumbers(): void {
    const pageNumbers: (number | string)[] = [];
    const firstPage = 0;
    const lastPage = this.totalPages - 1;

    pageNumbers.push(firstPage);

    if (this.pageIndex > 1) {
      pageNumbers.push('...');
    }

    for (let i = Math.max(1, this.pageIndex - 1); i <= Math.min(this.pageIndex + 1, lastPage - 1); i++) {
      pageNumbers.push(i);
    }

    if (this.pageIndex < lastPage - 1) {
      pageNumbers.push('...');
    }

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

  onClosePopupClick() {
    this.isFilterVisible = false;
  }

  onItemClick($event: MouseEvent) {
    event.stopPropagation();
  }

  orderButtonClicked() {
    event.stopPropagation();
    this.ascending = !this.ascending;
  }

  private checkRoute() {
    const url = this.router.url;
    this.isEvents = url.includes('all-events');
    this.isMyAssets = url.includes('all-my-assets');

    if (url.includes('all-events')) {
      this.filterType = 'events';
    } else if (url.includes('all-assets')) {
      this.filterType = 'assets';
    } else if (url.includes('all-my-assets')) {
      this.filterType = 'my-assets';
    }
  }

}
