import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from "@angular/material/button";
import {MatInput} from '@angular/material/input';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButton,
    MatInput
  ]
})
export class AuthModule { }
