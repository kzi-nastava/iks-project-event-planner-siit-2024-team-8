import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NavBarSideComponent } from './layout/nav-bar-side/nav-bar-side.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import { EventCardComponent } from './event/event-card/event-card.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AssetComponent } from './asset/asset.component';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RegisterComponent } from './user/register/register.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOption,
  MatOptionModule,
  NativeDateAdapter,
  NativeDateModule
} from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { CreateAssetComponent } from './asset/create-asset/create-asset.component';
import { EditAssetComponent } from './asset/edit-asset/edit-asset.component';
import { HomeComponent } from './layout/home/home.component';
import { MatIcon } from '@angular/material/icon';
import { HomeCardsComponent } from './layout/home-cards/home-cards.component';
import { SearchBarComponent } from './layout/search-bar/search-bar.component';
import { AssetCardComponent } from './asset/asset-card/asset-card.component';
import { DeleteConfirmationDialogComponent } from './dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AllEventsComponent } from './event/all-events/all-events.component';
import { MatPaginator } from '@angular/material/paginator';
import { FilterPopUpComponent } from './shared/filter-pop-up/filter-pop-up.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatSlider, MatSliderRangeThumb } from '@angular/material/slider';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { SearchBarHomeComponent } from './layout/search-bar-home/search-bar-home.component';
import { ProviderRegisterComponent } from './provider/provider-register/provider-register.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VerificationEmailDialogComponent } from './dialogs/verification-email-dialog/verification-email-dialog.component';
import { VerifyComponent } from './user/verify/verify.component';
import { AssetCategoriesComponent } from './asset/asset-categories/asset-categories.component';
import { AssetCategoryEditComponent } from './asset/asset-category-edit/asset-category-edit.component';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ToastComponent } from './shared/toast/toast.component';
import { Interceptor } from './infrastructure/auth/interceptor';
import { LogoutDialogComponent } from './dialogs/logout-dialog/logout-dialog.component';
import { EventModule } from './event/event.module';
import { ErrorCodeDialogComponent } from './dialogs/error-code-dialog/error-code-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BudgetComponent} from './event/budget/budget.component';
import { EventListPopupComponent } from './asset/event-list-popup/event-list-popup.component';
import {FastRegisterComponent} from './user/fast-register/fast-register.component';
import { CalendarComponent } from './calendar/calendar.component';
import {RouterOutlet} from '@angular/router';
import {FullCalendarModule} from '@fullcalendar/angular';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewPopupComponent } from './reviews/review-popup/review-popup.component';
import {PriceListComponent} from './price-list/price-list.component';
import { BlockUserDialogComponent } from './dialogs/block-user-dialog/block-user-dialog.component';
import { BlockedUsersDialogComponent } from './dialogs/blocked-users-dialog/blocked-users-dialog.component';
import { ReportUserDialogComponent } from './dialogs/report-user-dialog/report-user-dialog.component';
import {ReportsComponent} from './user/reports/reports.component';
import {MatTable, MatTableModule} from '@angular/material/table';
import {AgendaEditComponent} from './event/agenda-edit/agenda-edit.component';
import {GuestlistEditComponent} from './event/guestlist-edit/guestlist-edit.component';
import { InboxComponent } from './inbox/inbox.component';
import { ReservationDialogComponent } from './dialogs/reservation-dialog/reservation-dialog.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {IgxCarouselModule} from 'igniteui-angular';
import {MatSort} from "@angular/material/sort";
import {
  ReservationDateTimeComponentComponent
} from './asset/reservation-date-time-component/reservation-date-time-component.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    EventCardComponent,
    HomeComponent,
    HomeCardsComponent,
    SearchBarComponent,
    ProfileComponent,
    CreateAssetComponent,
    EditAssetComponent,
    AssetComponent,
    RegisterComponent,
    FastRegisterComponent,
    NavBarSideComponent,
    AssetCardComponent,
    DeleteConfirmationDialogComponent,
    AllEventsComponent,
    FilterPopUpComponent,
    SearchBarHomeComponent,
    ProviderRegisterComponent,
    ProfileEditComponent,
    AssetCategoriesComponent,
    AssetCategoryEditComponent,
    VerificationEmailDialogComponent,
    VerifyComponent,
    ToastComponent,
    LogoutDialogComponent,
    ErrorCodeDialogComponent,
    EventListPopupComponent,
    CalendarComponent,
    ReviewsComponent,
    ReviewPopupComponent,
    PriceListComponent,
    InboxComponent,
    BlockUserDialogComponent,
    BlockedUsersDialogComponent,
    ReportUserDialogComponent,
    ReportsComponent,
    ReservationDialogComponent,
    NotificationsComponent,
    ReservationDateTimeComponentComponent
  ],
  imports: [
    MatCardModule,
    FormsModule,
    BrowserModule,
    CommonModule, RouterOutlet, FullCalendarModule,
    AppRoutingModule,
    LayoutModule,
    EventModule,
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
    HttpClientModule,
    AuthModule,
    MatOptionModule,
    NgOptimizedImage,
    BrowserAnimationsModule, MatTable,
    MatTableModule,
    IgxCarouselModule, MatSort, NgxMaterialTimepickerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
