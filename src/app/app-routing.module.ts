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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'card', component: EventCardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-asset', component: CreateAssetComponent },
  { path: 'assets/products/:id/edit', component: EditAssetComponent },
  { path: 'assets/utilities/:id/edit', component: EditAssetComponent },
  { path: 'event', component: EventInfoComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  {path : 'all-events', component: AllEventsComponent },
  {path: 'edit-event', component: EditEventComponent },
  {path : 'all-assets', component: AllEventsComponent },
  { path: 'all-my-assets', component: AllEventsComponent },
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
    data: {role : 'ADMIN'}},
  {path: 'create-event-type', component: CreateEventTypeComponent},
  {path: 'create-event-type/:id', component: CreateEventTypeComponent,canActivate:[AuthGuard],
  data: {role : 'ADMIN'}},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration : 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
