import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventInfoComponent } from './event-info/event-info.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { CreateEventComponent } from './create-event/create-event.component';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatStep, MatStepper, MatStepperNext} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '../layout/layout.module';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle
} from '@angular/material/card';
import { ActivityCardEditComponent } from './activity-card-edit/activity-card-edit.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {
  IgxBadgeComponent,
  IgxCardComponent,
  IgxCardContentDirective,
  IgxCardMediaDirective, IgxCarouselComponent,
  IgxCheckboxComponent, IgxDatePickerComponent, IgxIconComponent,
  IgxInputGroupComponent,
  IgxRadioComponent,
  IgxRadioGroupDirective,
  IgxSelectComponent,
  IgxStepperComponent
} from 'igniteui-angular';
import { NewActivityCardComponent } from './new-activity-card/new-activity-card.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import { GuestEditCardComponent } from './guest-edit-card/guest-edit-card.component';
import { GuestCardComponent } from './guest-card/guest-card.component';
import { CreateEventTypeComponent } from './create-event-type/create-event-type.component';
import {MatPaginator} from "@angular/material/paginator";
import { EventTypesComponent } from './event-types/event-types.component';
import {RouterLink} from "@angular/router";
import { EditEventComponent } from './edit-event/edit-event.component';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BudgetItemCardComponent } from './budget-item-card/budget-item-card.component';
import { BudgetItemCardEditComponent } from './budget-item-card-edit/budget-item-card-edit.component';
import { BudgetComponent } from './budget/budget.component';
import {BoughtAssetsPopupComponent} from './bought-assets-popup/bought-assets-popup.component';
import {MatListModule} from '@angular/material/list';
import { GuestEventInfoComponent } from './guest-event-info/guest-event-info.component';
import { AgendaEventInfoComponent } from './agenda-event-info/agenda-event-info.component';
import { LocationEventInfoComponent } from './location-event-info/location-event-info.component';



@NgModule({
  declarations: [
    EventInfoComponent,
    CreateEventComponent,
    ActivityCardComponent,
    ActivityCardEditComponent,
    NewActivityCardComponent,
    GuestEditCardComponent,
    GuestCardComponent,
    CreateEventTypeComponent,
    EventTypesComponent,
    EditEventComponent,
    BudgetItemCardComponent,
    BudgetItemCardEditComponent,
    BudgetComponent,
    BoughtAssetsPopupComponent,
    GuestEventInfoComponent,
    AgendaEventInfoComponent,
    LocationEventInfoComponent
  ],
  imports: [
    CommonModule,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatStep,
    MatStepper,
    MatStepperNext,
    ReactiveFormsModule,
    LayoutModule,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIconButton,
    MatRadioButton,
    MatRadioGroup,
    FormsModule,
    MatDatepicker,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatProgressSpinner,
    MatSlideToggle,
    IgxDatePickerComponent,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatPaginator,
    RouterLink,
    MatCheckbox,
    MatMenu,
    MatMenuTrigger,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardActions,
    MatListModule,
  ]
})
export class EventModule { }
