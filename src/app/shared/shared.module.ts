import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {AuthService} from '../infrastructure/auth/auth.service';
import {adapterFactory} from 'angular-calendar/date-adapters/moment';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class SharedModule { }
