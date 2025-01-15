import { Component } from '@angular/core';
import {Event} from '../../model/event';
import {Asset} from '../../model/asset';
import {AssetService} from '../../services/asset-service';
import {Router} from '@angular/router';
import {EventService} from '../../services/event-service';
import {EventInfoResponse} from '../../event/domain/EventInfoResponse';
import {PagedResponse} from '../../shared/model/paged.response';
import {AssetResponse} from '../../model/asset.response';
import {EventCardResponse} from '../../event/domain/event.card.response';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.css'
})
export class HomeCardsComponent {

  events : EventCardResponse[];
  assets: AssetResponse[] = [];

  currentEvent : number = 0;
  currentAsset : number = 0;

  constructor(private eventService : EventService,private assetService: AssetService, private router: Router) {}


  ngOnInit() {
    this.assetService.getAllAssets().subscribe((assetsData: AssetResponse[]) => {
      this.assets = assetsData;
    });
    this.eventService.getTop5Events().subscribe((eventsData: EventCardResponse[]) => {
      this.events = eventsData;
    })
  }
  getTransformEvent() {
    return `translateX(-${this.currentEvent * 33.33}%)`;
  }

  getTransformAsset() {
    return `translateX(-${this.currentAsset * 33.33}%)`;
  }
  /*
  onAssetCardClick(asset: Asset) {
    if (this.assetService.isUtility(asset)) {
      this.router.navigate([`/assets/utilities/${asset.id}`]);
    } else {
      this.router.navigate([`/assets/products/${asset.id}`]);
    }
  }
   */
}
