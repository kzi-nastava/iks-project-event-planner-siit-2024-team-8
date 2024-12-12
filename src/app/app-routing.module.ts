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
import {ProviderRegisterComponent} from './user/provider-register/provider-register.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';
import {VerifyComponent} from './user/verify/verify.component';
import { AssetCategoriesComponent } from './asset/asset-categories/asset-categories.component';
import { AssetCategoryEditComponent } from './asset/asset-category-edit/asset-category-edit.component';
import {LoginComponent} from './infrastructure/auth/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'card', component: EventCardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-asset', component: CreateAssetComponent },
  { path: 'edit-asset', component: EditAssetComponent },
  { path: 'asset', component: AssetComponent },
  { path: 'event', component: EventInfoComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  {path : 'all-events', component: AllEventsComponent },
  {path : 'all-assets', component: AllEventsComponent },
  { path: 'all-my-assets', component: AllEventsComponent },
  {path : 'asset/:id', component: AssetComponent },
  {path : 'event/:id', component: EventInfoComponent },
  {path: 'provider-register', component: ProviderRegisterComponent },
  {path: 'profile-edit', component: ProfileEditComponent},
  {path: 'verify', component: VerifyComponent},
  {path: 'asset-categories', component: AssetCategoriesComponent},
  {path: 'asset-category-edit', component: AssetCategoryEditComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration : 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
