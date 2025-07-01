import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { EventCardComponent } from './event/event-card/event-card.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AssetComponent } from './asset/asset.component';
import {RegisterComponent} from './user/register/register.component';
import {CreateAssetComponent} from './asset/create-asset/create-asset.component';
import {EditAssetComponent} from './asset/edit-asset/edit-asset.component';
import {AllEventsComponent} from './event/all-events/all-events.component';
import {EventInfoComponent} from './event/event-info/event-info.component';
import {ProviderRegisterComponent} from './provider/provider-register/provider-register.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';
import {VerifyComponent} from './user/verify/verify.component';
import { AssetCategoriesComponent } from './asset/asset-categories/asset-categories.component';
import { AssetCategoryEditComponent } from './asset/asset-category-edit/asset-category-edit.component';
import {LoginComponent} from './infrastructure/auth/login/login.component';
import {CreateEventComponent} from './event/create-event/create-event.component';
import {ActivityCardComponent} from './event/activity-card/activity-card.component';
import {CreateEventTypeComponent} from './event/create-event-type/create-event-type.component';
import {EventTypesComponent} from './event/event-types/event-types.component';
import {AuthGuard} from './infrastructure/auth/auth.guard';
import {EditEventComponent} from './event/edit-event/edit-event.component';
import {BudgetComponent} from './event/budget/budget.component';
import {FastRegisterComponent} from './user/fast-register/fast-register.component';
import {CalendarComponent} from './calendar/calendar.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {ReportsComponent} from './user/reports/reports.component';
import {PriceListComponent} from './price-list/price-list.component';
import {GuestlistEditComponent} from './event/guestlist-edit/guestlist-edit.component';
import {AgendaEditComponent} from './event/agenda-edit/agenda-edit.component';
import { InboxComponent } from './inbox/inbox.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'card', component: EventCardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-asset', component: CreateAssetComponent },
  { path: 'assets/products/:id/edit', component: EditAssetComponent },
  { path: 'assets/utilities/:id/edit', component: EditAssetComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  {path : 'all-events', component: AllEventsComponent },
  {path: 'edit-event/:id', component: EditEventComponent },
  {path : 'all-assets', component: AllEventsComponent },
  { path: 'all-my-assets', component: AllEventsComponent },
  { path: 'all-my-assets/:providerId', component: AllEventsComponent },
  {path : 'assets/products/:id', component: AssetComponent },
  {path : 'assets/utilities/:id', component: AssetComponent },
  {path : 'event/:id', component: EventInfoComponent },
  {path: 'provider-register', component: ProviderRegisterComponent },
  {path: 'profile-edit', component: ProfileEditComponent},
  {path: 'verify', component: VerifyComponent},
  {path: 'asset-categories', component: AssetCategoriesComponent},
  {path: 'asset-category-edit', component: AssetCategoryEditComponent},
  {path: 'create-event', component: CreateEventComponent},
  {path: 'activity-card', component: ActivityCardComponent},
  {path: 'event-types',component:EventTypesComponent,canActivate:[AuthGuard],
    data: {role  : 'ADMIN'}},
  {path: 'create-event-type', component: CreateEventTypeComponent},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'events/:id/budget', component: BudgetComponent },
  {path: 'fast-register', component: FastRegisterComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'reports',component: ReportsComponent},
  {path: 'price-list', component: PriceListComponent},
  {path: 'guestlist-edit/:id', component: GuestlistEditComponent},
  {path: 'agenda-edit/:id', component: AgendaEditComponent},
  { path: 'inbox', component: InboxComponent },
  {path: 'events/:eventId/assets/products/version/:id', component: AssetComponent},
  {path: 'events/:eventId/assets/utilities/version/:id', component: AssetComponent},
  { path: '**', redirectTo: '/home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration : 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
