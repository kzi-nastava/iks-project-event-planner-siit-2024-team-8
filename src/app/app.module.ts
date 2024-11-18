import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import { WineModule } from './wine/wine.module';
import { HomeCardComponent } from './home-card/home-card.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';
import { AssetComponent } from './asset/asset.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCardComponent,
    ProfileComponent,
    CreateAssetComponent,
    EditAssetComponent,
    AssetComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    WineModule,
    MatCardModule,  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
