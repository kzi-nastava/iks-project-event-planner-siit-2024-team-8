import {Component, ViewChild} from '@angular/core';
import { EventService } from '../../services/event-service';
import { AssetService } from '../../services/asset-service';
import { PageEvent } from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import { EventType } from '../../event/domain/event.type';
import { Asset } from '../../model/asset';
import {PagedResponse} from '../../shared/model/paged.response';
import {EventInfoResponse} from '../domain/EventInfoResponse';
import {FilterPopUpComponent} from '../../shared/filter-pop-up/filter-pop-up.component';
import {returnSearchEventsRequest, SearchEventsRequest} from '../domain/search.events.request';
import {ApiResponse} from '../../model/api.response';
import {EventCardResponse} from '../domain/event.card.response';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {searchAssetsRequest, SearchAssetsRequest} from '../../model/search.assets.request';
import {AssetResponse} from '../../model/asset.response';
import {PageProperties} from '../../model/page.properties';
import {SearchBarComponent} from '../../layout/search-bar/search-bar.component';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent {
  @ViewChild('searchBar') searchBar!: SearchBarComponent;

  events: EventCardResponse[] = [];
  assets: AssetResponse[] = [];
  filterType: string = '';
  providerId: string = '';

  currentEventRequest : SearchEventsRequest = returnSearchEventsRequest();
  currentAssetRequest : SearchAssetsRequest = searchAssetsRequest();


  pageProperties: PageProperties = {
    page: 0,
    pageSize: 10,
    totalCount: 0,
    pageSizeOptions: [3, 5, 10],
    sortBy: null,
    sortOrder: null,
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
  ngAfterViewInit() {
    this.searchBar.searchControl.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        if (this.isEvents) {
          this.currentEventRequest.name = value;
          this.filterEvents();
        } else {
          this.currentAssetRequest.name = value;
          this.filterAssets();
        }
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
      this.eventService.filterEvents(returnSearchEventsRequest(), this.pageProperties)
        .subscribe((response: PagedResponse<EventCardResponse>) => {
          this.events = response.content;
          this.pageProperties.totalCount = response.totalElements;
        });
    } else if (this.filterType === 'my-assets' && this.providerId) {
      this.assetService.getAssetsByProviderId(this.providerId).subscribe((assetsData: any) => {
        this.assets = assetsData;
        console.log("uspesno od provider id");
      });
    } else {
      this.assetService.filterAssets(searchAssetsRequest(),this.pageProperties).subscribe((assetsData: PagedResponse<AssetResponse>) => {
        this.assets = assetsData.content;
        this.pageProperties.totalCount = assetsData.totalElements;
      });
    }
  }

  pageChanged(pageEvent: PageEvent) {
    this.pageProperties.page = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.fetchData();
  }


  onCardClick(asset: AssetResponse): void {
    if (asset.type == 'UTILITY') {
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
    const routeParams = this.route.snapshot.paramMap;

    if (url.includes('all-events')) {
      this.filterType = 'events';
    } else if (url.includes('all-assets')) {
      this.filterType = 'assets';
    } else if (url.includes('all-my-assets')) {
      this.filterType = 'my-assets';
      this.providerId = routeParams.get('providerId') ?? '';
    }
  }

  onApplyEventFiltersClicked(request : SearchEventsRequest) {
    this.eventService.filterEvents(request,this.pageProperties).subscribe((response: PagedResponse<EventCardResponse>) => {
      console.log()
      this.events = response.content;
      this.pageProperties.totalCount = response.totalElements;
    })
    this.isFilterVisible = false;
    this.currentEventRequest = request;
  }
  onApplyAssetsFiltersClicked($event: SearchAssetsRequest) {
    this.assetService.filterAssets($event,this.pageProperties).subscribe((response: PagedResponse<AssetResponse>) => {
      this.assets = response.content;
      this.pageProperties.totalCount = response.totalElements;
    })
    this.isFilterVisible = false;
    this.currentAssetRequest = $event;
  }

  filterEvents() {
    this.eventService.filterEvents(this.currentEventRequest, this.pageProperties).subscribe((response: PagedResponse<EventCardResponse>) => {
      this.events = response.content;
      this.pageProperties.totalCount = response.totalElements;
    })
  }

  filterAssets() {
    this.assetService.filterAssets(this.currentAssetRequest,this.pageProperties).subscribe((response: PagedResponse<AssetResponse>) => {
      this.assets = response.content;
      this.pageProperties.totalCount = response.totalElements;
    })
  }
}
