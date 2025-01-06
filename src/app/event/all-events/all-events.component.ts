import {Component, ViewChild} from '@angular/core';
import { EventService } from '../../services/event-service';
import { AssetService } from '../../services/asset-service';
import { PageEvent } from '@angular/material/paginator';
import {Router} from '@angular/router';
import { EventType } from '../../event/domain/event.type';
import { Asset } from '../../model/asset';
import {PagedResponse} from '../../shared/model/paged.response';
import {EventInfoResponse} from '../domain/EventInfoResponse';
import {FilterPopUpComponent} from '../../shared/filter-pop-up/filter-pop-up.component';
import {SearchEventsRequest} from '../domain/search.events.request';
import {ApiResponse} from '../../model/api.response';
import {EventCardResponse} from '../domain/event.card.response';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {SearchAssetsRequest} from '../../model/search.assets.request';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent {
  events: EventCardResponse[] = [];
  assets: Asset[] = [];
  filterType: string = '';
  sortParameter: string = '';

  pageProperties = {
    page: 0,
    pageSize: 4,
    totalCount: 0,
    pageSizeOptions: [4, 8, 12]
  };
  constructor(
    private router: Router,
    private eventService: EventService,
    private assetService: AssetService
  ) {}

  ngOnInit() {
    this.checkRoute();
    this.fetchData();
    this.router.events.subscribe(() => {
      this.checkRoute();
      this.fetchData();
    });
  }


  // Filter visibility
  isFilterVisible: boolean = false;

  // Current order
  ascending: boolean = true;

  // Events Page?
  isEvents: boolean;
  isMyAssets: boolean = false;

  fetchData() {
    if (this.isEvents) {
      // Fetch events
      this.eventService.getAllEvents(this.pageProperties).subscribe((response: PagedResponse<EventCardResponse>) => {
        this.events = response.content;
        this.pageProperties.totalCount = response.totalElements;
      });
    } else {
      // Fetch assets
      this.assetService.getAllAssets().subscribe((assetsData: any) => {
        this.assets = [...assetsData.products, ...assetsData.utilities];
      });
    }
  }

  pageChanged(pageEvent: PageEvent) {
    this.pageProperties.page = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.fetchData();
  }


  onCardClick(asset: Asset): void {
    console.log('Navigating to asset with ID:', asset.id);
    if (this.assetService.isUtility(asset)) {
      this.router.navigate([`/assets/utilities/${asset.id}`]);
    } else {
      this.router.navigate([`/assets/products/${asset.id}`]);
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

  onApplyEventFiltersClicked(request : SearchEventsRequest) {
    this.eventService.filterEvents(request).subscribe((response: PagedResponse<EventCardResponse>) => {
      console.log()
      this.events = response.content;
      this.pageProperties.totalCount = response.totalElements;
    })
    this.isFilterVisible = false;
  }
  onApplyAssetsFiltersClicked($event: SearchAssetsRequest) {
    
  }

  onCheckboxChanged($event: MatCheckboxChange, name: string) {
    if ($event.checked){
      this.sortParameter = name;

    }
  }


  sortByName(ascending: boolean) {
    this.events = [...this.events.sort((a, b) => {
      if (ascending) {
        return a.name.localeCompare(b.name); // Ascending (A → Z)
      } else {
        return b.name.localeCompare(a.name); // Descending (Z → A)
      }
    })];
  }

  sortByStartDate(ascending: boolean) {
    this.events = [...this.events.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();

      if (ascending) {
        return dateA - dateB; // Ascending (earliest first)
      } else {
        return dateB - dateA; // Descending (latest first)
      }
    })];
  }

  sortByEndDate(ascending: boolean) {
    this.events = [...this.events.sort((a, b) => {
      const dateA = new Date(a.endDate).getTime();
      const dateB = new Date(b.endDate).getTime();

      if (ascending) {
        return dateA - dateB; // Ascending (earliest first)
      } else {
        return dateB - dateA; // Descending (latest first)
      }
    })];
  }

  sortByCapacity(ascending: boolean) {
    this.events = [...this.events.sort((a, b) => {
      if (ascending) {
        return a.capacity - b.capacity; // Ascending (lowest capacity first)
      } else {
        return b.capacity - a.capacity; // Descending (highest capacity first)
      }
    })];
  }

}
