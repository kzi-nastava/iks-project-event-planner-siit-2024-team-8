import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WinesComponent } from './wine/wines/wines.component';
import { AddWineComponent } from './wine/add-wine/add-wine.component';
import { HomeComponent } from './layout/home/home.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateAssetComponent } from './asset/create-asset/create-asset.component';
import { EditAssetComponent } from './asset/edit-asset/edit-asset.component';
import { AssetComponent } from './asset/asset.component';

const routes: Routes = [
  { path: 'wine', component: WinesComponent },
  { path: 'add', component: AddWineComponent },
  { path: 'home', component: HomeComponent },
  { path: 'card', component: HomeCardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-asset', component: CreateAssetComponent },
  { path: 'edit-asset', component: EditAssetComponent },
  { path: 'asset', component: AssetComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
