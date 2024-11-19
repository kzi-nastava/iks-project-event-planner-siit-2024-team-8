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
import { CreateAssetComponent } from './asset/create-asset/create-asset.component';
import { EditAssetComponent } from './asset/edit-asset/edit-asset.component';
import { AssetComponent } from './asset/asset.component';
import { HomeCardsComponent } from './home-cards/home-cards.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import { AssetCardComponent } from './asset/asset-card/asset-card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatFormField, MatPrefix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HomeCardComponent,
    ProfileComponent,
    CreateAssetComponent,
    EditAssetComponent,
    AssetComponent,
    HomeCardsComponent,
    AssetCardComponent,
    SearchBarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    WineModule,
    MatCardModule,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatPrefix,
    MatInput,
    MatButton,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  exports: [
    HomeCardsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
