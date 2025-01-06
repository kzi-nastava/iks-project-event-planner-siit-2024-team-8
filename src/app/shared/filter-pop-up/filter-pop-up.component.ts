import {Component, EventEmitter, Inject, Input, OnChanges, Output} from '@angular/core';
import {returnSearchEventsRequest, SearchEventsRequest} from '../../event/domain/search.events.request';
import {EventType} from '../../event/domain/event.type';
import {EventTypeService} from '../../services/event-type-service';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CreateEventTypeData} from '../../event/create-event-type/create-event-type.component';
import {searchAssetsRequest, SearchAssetsRequest} from '../../model/search.assets.request';
import {AssetCategory} from '../../model/asset-category';
import {AssetCategoryService} from '../../services/asset-category-service';

@Component({
  selector: 'app-filter-pop-up',
  templateUrl: './filter-pop-up.component.html',
  styleUrls: ['./filter-pop-up.component.css']
})
export class FilterPopUpComponent implements OnChanges {
  @Input() filterType: string = '';

  @Output() clicked : EventEmitter<SearchEventsRequest> = new EventEmitter();

  @Output() filterAssets : EventEmitter<SearchAssetsRequest> = new EventEmitter();
  filterEventsRequest : SearchEventsRequest;

  filterAssetsRequest : SearchAssetsRequest;

  eventTypes : EventType[];
  assetCategories : AssetCategory[];

  eventFilters: string[] = ['Event Type', 'Private', 'Capacity', 'Start Date', 'End Date'];
  assetFilters: string[] = ['Event Type', 'Asset Category', 'Asset Type', 'Price', 'Availability'];
  myAssetFilters: string[] = ['Event Type', 'Asset Category', 'Asset Type', 'Price', 'Availability'];

  assetTypes = ['Service', 'Product'];
  currentFilters: string[] = [];

  selectedAssetCategory: string = '';
  duration: number | null = null;

  constructor(private eventTypeService: EventTypeService,
              private assetCategoryService: AssetCategoryService,) {}

  ngOnChanges() {
    if (this.filterType === 'events') {
      this.currentFilters = this.eventFilters;
    } else if (this.filterType === 'assets' || this.filterType === 'my-assets') {
      this.currentFilters = this.assetFilters;
    } else {
      this.currentFilters = [];
    }
  }

  ngAfterViewInit(): void {
    const filterTitles: NodeListOf<HTMLElement> = document.querySelectorAll('.filter-title');

    filterTitles.forEach((title, index) => {
      title.addEventListener('click', () => {
        const options = document.querySelectorAll('.filter-options')[index] as HTMLElement;

        if (options) {
          options.classList.toggle('show');
        }
      });
    });

  }

  ngOnInit(): void {
    this.eventTypeService.getActiveEventTypes().subscribe((eventTypes: EventType[]) => {
      this.eventTypes = eventTypes;
    })
    this.assetCategoryService.getActiveCategories().subscribe((assetCategories: AssetCategory[]) => {
      this.assetCategories = assetCategories;
    })

    this.filterEventsRequest = returnSearchEventsRequest();
    this.filterAssetsRequest = searchAssetsRequest();
  }

  onClosePopupClick() {
  }

  onAssetCategoryChange($event: any) {
    this.selectedAssetCategory = $event.value;
    if (this.selectedAssetCategory === 'Service') {
      this.duration = 1;
    } else {
      this.duration = null;
    }
  }

  onApplyFilterClick() {
  if (this.filterType === 'assets' || this.filterType === 'my-assets'){
    this.filterAssets.emit(this.filterAssetsRequest)
  }else{
    this.clicked.emit(this.filterEventsRequest);
  }

  }

  onChecked(type: EventType, $event: MatCheckboxChange) {
    if($event.checked){
      this.filterEventsRequest.eventTypes.push(type.id);
    }else{
      this.filterEventsRequest.eventTypes = this.filterEventsRequest.eventTypes.filter(eventType => eventType !== type.id);
    }
  }

  onCheckedCategory(category: AssetCategory, $event: MatCheckboxChange) {
    if($event.checked){
      this.filterAssetsRequest.assetCategories.push(category.id);
    }else{
      this.filterAssetsRequest.assetCategories = this.filterAssetsRequest.assetCategories.filter(assetCategory => assetCategory !== category.id);
    }
  }
}
