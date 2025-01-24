import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastRegisterComponent } from './fast-register/fast-register.component';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../infrastructure/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReportsComponent } from './reports/reports.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';



@NgModule({
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MaterialModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
  ],
  declarations: [
  ]
})
export class UserModule { }
