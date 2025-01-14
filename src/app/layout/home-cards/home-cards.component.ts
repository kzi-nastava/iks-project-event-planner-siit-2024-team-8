import { Component } from '@angular/core';
import {Event} from '../../model/event';
import {Asset} from '../../model/asset';
import {AssetService} from '../../services/asset-service';
import {Router} from '@angular/router';
import {EventService} from '../../services/event-service';
import {EventInfoResponse} from '../../event/domain/EventInfoResponse';
import {PagedResponse} from '../../shared/model/paged.response';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.css'
})
export class HomeCardsComponent {

  events : EventInfoResponse[];
  assets: Asset[] = [];

  currentEvent : number = 0;
  currentAsset : number = 0;

  constructor(private eventService : EventService,private assetService: AssetService, private router: Router) {}


  ngOnInit() {
    this.assetService.getAllAssets().subscribe((assetsData: any) => {
      this.assets = [...assetsData.products, ...assetsData.utilities];
    });
  }



  prevEvent() {
    if (this.currentEvent > 0) {
      this.currentEvent--;
    } else {
      this.currentEvent = Math.ceil(this.events.length / 3) - 1;
    }
  }


  nextEvent() {
    if (this.currentEvent < Math.ceil(this.events.length / 3) - 1) {
      this.currentEvent++;
    } else {
      this.currentEvent = 0;
    }
  }

  prevAsset () :void {
    if (this.currentAsset > 0) {
      this.currentAsset--;
    }
    else {
      this.currentAsset = Math.ceil(this.assets.length / 3) - 1;
    }
  }

  nextAsset () :void {
    if (this.currentAsset < Math.ceil(this.assets.length / 3) - 1) {
      this.currentAsset++;
    } else {
      this.currentAsset = 0;
    }
  }

  getTransformEvent() {
    return `translateX(-${this.currentEvent * 33.33}%)`;
  }

  getTransformAsset() {
    return `translateX(-${this.currentAsset * 33.33}%)`;
  }

  onAssetCardClick(asset: Asset) {
    if (this.assetService.isUtility(asset)) {
      this.router.navigate([`/assets/utilities/${asset.id}`]);
    } else {
      this.router.navigate([`/assets/products/${asset.id}`]);
    }
  }
}
