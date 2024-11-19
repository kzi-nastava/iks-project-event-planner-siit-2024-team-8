import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Asset } from '../../model/asset';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrl: './asset-card.component.css'
})
export class AssetCardComponent {

  @Input() asset: Asset;

  @Output()
  clicked: EventEmitter<Asset> = new EventEmitter();
  favourite: boolean = false;


  onFavouriteClicked() {
    this.favourite = !this.favourite;
  }
}
