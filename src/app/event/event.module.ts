import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventInfoComponent } from './event-info/event-info.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { CreateEventComponent } from './create-event/create-event.component';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatStep, MatStepper, MatStepperNext} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '../layout/layout.module';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import {MatCard, MatCardContent, MatCardImage, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
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
        IgxStepperComponent,
        IgxCardComponent,
        IgxBadgeComponent,
        IgxCardMediaDirective,
        IgxCardContentDirective,
        IgxInputGroupComponent,
        IgxSelectComponent,
        IgxRadioGroupDirective,
        IgxRadioComponent,
        IgxCheckboxComponent,
        IgxIconComponent,
        IgxCarouselComponent,
        MatProgressSpinner,
        MatSlideToggle,
        IgxDatePickerComponent,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepickerModule,
        MatPaginator,
        RouterLink
    ]
})
export class EventModule { }
