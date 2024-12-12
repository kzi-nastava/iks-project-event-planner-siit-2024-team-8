import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventInfoComponent } from './event-info/event-info.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';



@NgModule({
  declarations: [
    EventInfoComponent
  ],
  imports: [
    CommonModule,
    MatButton,
    MatIcon
  ]
})
export class EventModule { }
