import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastRegisterComponent } from './fast-register/fast-register.component';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../infrastructure/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
  ]
})
export class UserModule { }
