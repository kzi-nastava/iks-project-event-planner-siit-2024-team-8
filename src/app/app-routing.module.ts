import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import { WinesComponent } from './wine/wines/wines.component';
import { AddWineComponent } from './wine/add-wine/add-wine.component';
import { HomeComponent } from './layout/home/home.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AssetComponent } from './asset/asset.component';
import {RegisterComponent} from './user/register/register.component';
import {CreateAssetComponent} from './asset/create-asset/create-asset.component';
import {EditAssetComponent} from './asset/edit-asset/edit-asset.component';
import {AllEventsComponent} from './all-events/all-events.component';
import {EventComponent} from './event/event.component'
import {ProviderRegisterComponent} from './provider-register/provider-register.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';
import {VerifyComponent} from './verify/verify.component';
import { AssetCategoriesComponent } from './asset/asset-categories/asset-categories.component';
import { AssetCategoryEditComponent } from './asset/asset-category-edit/asset-category-edit.component';
import {LoginComponent} from './infrastructure/auth/login/login.component';

const routes: Routes = [
  { path: 'wine', component: WinesComponent },
  { path: 'add', component: AddWineComponent },
  { path: 'home', component: HomeComponent },
  { path: 'card', component: HomeCardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-asset', component: CreateAssetComponent },
  { path: 'edit-asset', component: EditAssetComponent },
  { path: 'asset', component: AssetComponent },
  { path: 'event', component: EventComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  {path : 'all-events', component: AllEventsComponent },
  {path : 'all-assets', component: AllEventsComponent },
  { path: 'all-my-assets', component: AllEventsComponent },
  {path : 'asset/:id', component: AssetComponent },
  {path : 'event/:id', component: EventComponent },
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
