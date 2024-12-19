import { Component } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {EventType} from '../domain/event.type';
import {AssetCategoryEditComponent} from '../../asset/asset-category-edit/asset-category-edit.component';
import {CreateEventTypeComponent} from '../create-event-type/create-event-type.component';
import {MatDialog} from '@angular/material/dialog';
import {EventTypeService} from '../../services/event-type-service';

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrl: './event-types.component.css'
})
export class EventTypesComponent {
  pageProperties = {
    page: 0,
    pageSize: 4,
    totalCount: 0,
    pageSizeOptions: [4, 8, 12]
  };
  showActivated:boolean = true;
  eventTypes: EventType[] = [];
  currentPageTypes: EventType[] = [];

  constructor(
    private dialog: MatDialog,
    private eventTypeService: EventTypeService,
  ) {
  }

  ngOnInit() {
      this.loadActiveEventTypes();
  }

  loadActiveEventTypes(): void {
    this.eventTypeService.getActiveEventTypes().subscribe(
      (data: EventType[]) => {
        this.eventTypes = data;
        this.pageProperties.totalCount = this.eventTypes.length;
        this.updatePageData();
      }
    )
  }

  loadInactiveEventTypes(): void {
    this.eventTypeService.getDeactivatedEventType().subscribe(
      (data: EventType[]) => {
        this.eventTypes = data;
        this.pageProperties.totalCount = this.eventTypes.length;
        this.updatePageData();
      }
    )
  }

  onAddEventClick() {

  }

  onCreateEventType() {
    const dialogRef = this.dialog.open(CreateEventTypeComponent, {
      width: '400px',
      data: { isEditMode: false }
    });

    dialogRef.componentInstance.saveType.subscribe((result: EventType) => {
      this.saveEventType(result);
    })
  }

  deactivateType(eventType : EventType) {
    this.eventTypeService.deactivateEventType(eventType).subscribe(
      result => {
        this.eventTypes = this.eventTypes.filter(eventType => eventType.id !== result.id)
        this.pageProperties.totalCount--;
        this.updatePageData();
      },
      err => {
        console.log(err);
      }
    );
  }

  private activateType(result: EventType) {
    this.eventTypeService.activateEventType(result).subscribe(
      result => {
        this.eventTypes = this.eventTypes.filter(eventType => eventType.id !== result.id)
        this.pageProperties.totalCount--;
        this.updatePageData();
      },
      err => {
        console.log(err);
      }
    );
  }

  saveEventType(eventType: EventType) {
      this.eventTypeService.createEventType(eventType).subscribe(
        newType => {
          this.eventTypes.push(newType);
          this.pageProperties.totalCount = this.eventTypes.length;
          this.updatePageData();
        },
        error => {
          console.error('Error creating category', error);
        }
      );
  }

  pageChanged(pageEvent: PageEvent) {
    this.pageProperties.page = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.updatePageData();
  }

  private updatePageData() {
    this.currentPageTypes = this.eventTypes.slice(this.pageProperties.page * this.pageProperties.pageSize,
      this.pageProperties.pageSize * (this.pageProperties.page+1));
  }

  openEditEventType($event: EventType) {
    const dialogRef = this.dialog.open(CreateEventTypeComponent, {
      width: '400px',
      data: {
        eventType: $event,
        isEditMode: true
      }
    });
    dialogRef.componentInstance.deactivateType.subscribe((result: EventType) => {
      this.deactivateType(result);
    })
    dialogRef.componentInstance.activateType.subscribe((result: EventType) => {
      this.activateType(result);
    })
    dialogRef.componentInstance.saveType.subscribe((result: EventType) => {
      this.updateType(result);
    })

  }



  onActiveChanged() {
    if (this.showActivated){
      this.loadActiveEventTypes()
    }else{
      this.loadInactiveEventTypes();
    }
  }

  private updateType(result: EventType) {
    this.eventTypeService.updateEventType(result).subscribe(
      result => {
        this.eventTypes = this.eventTypes.filter(eventType => eventType.id !== result.id)
        this.eventTypes.push(result);
        this.updatePageData();
      }
    )
  }
}
