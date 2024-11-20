import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-filter-pop-up',
  templateUrl: './filter-pop-up.component.html',
  styleUrls: ['./filter-pop-up.component.css']
})
export class FilterPopUpComponent implements OnChanges {
  @Input() filterType: string = ''; 

  eventFilters: string[] = ['Event Type', 'Private', 'Capacity', 'Start Date', 'End Date'];
  assetFilters: string[] = ['Event Type', 'Asset Category', 'Asset Type', 'Price', 'Availability'];
  myAssetFilters: string[] = ['Event Type', 'Asset Category', 'Asset Type', 'Price', 'Availability'];

  assetCategories = ['Service', 'Product'];
  assetTypes = ['Type A', 'Type B', 'Type C']; 
  currentFilters: string[] = []; 

  selectedAssetCategory: string = 'Product'; 
  duration: number | null = null;

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
}
