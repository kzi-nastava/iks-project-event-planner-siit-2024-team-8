import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {NavBarSideComponent} from './nav-bar-side/nav-bar-side.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import { WineModule } from './wine/wine.module';
import { HomeCardComponent } from './home-card/home-card.component';
import { ProfileComponent } from './profile/profile.component';
import { AssetComponent } from './asset/asset.component';
import { LoginComponent } from './login/login.component';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import { RegisterComponent } from './register/register.component';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatNativeDateModule, MatOption, NativeDateAdapter, NativeDateModule} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {CreateAssetComponent} from './asset/create-asset/create-asset.component';
import {EditAssetComponent} from './asset/edit-asset/edit-asset.component';
import {HomeComponent} from './layout/home/home.component';
import {MatIcon} from '@angular/material/icon';
import {HomeCardsComponent} from './home-cards/home-cards.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {AssetCardComponent} from './asset/asset-card/asset-card.component';
import { DeleteConfirmationDialogComponent } from './dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {AllEventsComponent} from './all-events/all-events.component';
import {MatPaginator} from '@angular/material/paginator';
import { FilterPopUpComponent } from './filter-pop-up/filter-pop-up.component';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatSlider, MatSliderRangeThumb} from '@angular/material/slider';
import {EventComponent} from './event/event.component';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import { SearchBarHomeComponent } from './search-bar-home/search-bar-home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeCardComponent,
    HomeComponent,
    HomeCardsComponent,
    SearchBarComponent,
    ProfileComponent,
    CreateAssetComponent,
    EditAssetComponent,
    AssetComponent,
    LoginComponent,
    RegisterComponent,
    NavBarSideComponent,
    AssetCardComponent,
    DeleteConfirmationDialogComponent,
    AllEventsComponent,
    FilterPopUpComponent,
    EventComponent,
    SearchBarHomeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    WineModule,
    MatCardModule,
    MatInput,
    MatButton,
    MatFormField,
    CommonModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatRadioGroup,
    MatRadioButton,
    MatOption,
    MatSelect,
    MatIcon,
    MatDialogModule,
    MatSlideToggleModule,
    MatPaginator,
    MatCheckbox,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatSlider,
    MatMenu,
    MatMenuTrigger,
    MatNativeDateModule,
    MatSliderRangeThumb,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
