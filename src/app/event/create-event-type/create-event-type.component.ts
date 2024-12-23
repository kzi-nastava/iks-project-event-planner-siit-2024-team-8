import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {EventType} from '../domain/event.type'
import {ToastService} from '../../services/toast-service';
import {AssetCategoryService} from '../../services/asset-category-service';
import {AssetCategory} from '../../model/asset-category';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-create-event-type',
  templateUrl: './create-event-type.component.html',
  styleUrl: './create-event-type.component.css'
})
export class CreateEventTypeComponent {

  isEditMode :boolean = false;
  eventType :EventType;
  assetCategories: AssetCategory[] = [];
  selectedCategories: AssetCategory[] = [];
  selectOpened : boolean = false;
  private shouldClose:boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateEventTypeData,
    private dialogRef: MatDialogRef<CreateEventTypeComponent>,
    private toastService: ToastService,
    private assetCategoriesService : AssetCategoryService
  ) {
    this.eventType = data.eventType;
    this.isEditMode = data.isEditMode;
  }

  ngOnInit() {
    if (!this.isEditMode) {
      this.eventType  = {
        name : "",
        description : "",
        assetCategories: []
      };
    }
    this.setAssetCaegories();
  }
  @Output()
  saveType: EventEmitter<EventType> = new EventEmitter();
  @Output()
  deactivateType: EventEmitter<EventType> = new EventEmitter();
  @Output()
  activateType: EventEmitter<EventType> = new EventEmitter();
  @Output()
  editType: EventEmitter<any> = new EventEmitter();

  setAssetCaegories() {
    this.assetCategoriesService.getActiveCategories().subscribe(assetCategories => {
      this.assetCategories = assetCategories;
    })
  }

  onSelectOpenedChange(isOpen: boolean) {
    if (isOpen && !this.shouldClose) {
      this.shouldClose = true;  //
      event.stopPropagation();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDeactivate() {
    this.dialogRef.close();
    if (this.eventType.name !== "" && this.eventType.description !== ""){
      console.log("emitting...", this.eventType);
      this.deactivateType.emit(
        this.eventType
      );
    }else{
      this.toastService.showErrorToast("Name and description must be provided.")
    }
  }

  onSave() {
    console.log(this.eventType.assetCategories);
    this.dialogRef.close();
    if (this.eventType.name !== "" && this.eventType.description !== ""){
      this.saveType.emit(
        this.eventType
      );
    }else{
      this.toastService.showErrorToast("Name and description must be provided.")
    }
  }

  onActivate() {
    this.dialogRef.close();
    if (this.eventType.name !== "" && this.eventType.description !== ""){
      this.activateType.emit(
        this.eventType
      );
    }
  }

  isCategorySelected(category: any): boolean {
    return this.eventType.assetCategories.some(selected => selected.name === category.name);
  }


  onChecked(category: AssetCategory, $event: MatCheckboxChange){
    if($event.checked){
      this.eventType.assetCategories.push(category);
    }else{
      this.eventType.assetCategories = this.eventType.assetCategories.filter(assetCategory => assetCategory.id !== category.id);
    }
    console.log(this.eventType.assetCategories);
  }
}
export interface CreateEventTypeData {
  eventType : EventType;
  isEditMode :boolean;
}
