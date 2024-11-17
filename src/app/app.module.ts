import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import { WineModule } from './wine/wine.module';
import { HomeCardComponent } from './home-card/home-card.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    HomeCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    WineModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
