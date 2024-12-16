import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {MatIcon} from "@angular/material/icon";
import {AppModule} from '../app.module';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';



@NgModule({
  declarations: [
    NavBarComponent,
    LeafletMapComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatIcon,
  ],
  exports: [NavBarComponent, LeafletMapComponent]
})
export class LayoutModule { }
