import { Injectable } from '@angular/core';
import {Asset, AssetType} from '../model/asset';
export const assets: Asset[] = [
  // Products
  {
    name: 'Balloons',
    type: AssetType.PRODUCT,
    description: 'Colorful balloons for decoration at parties or events.'
  },
  {
    name: 'Soundbar',
    type: AssetType.PRODUCT,
    description: 'A high-quality soundbar for audio enhancement at events.'
  },
  {
    name: 'LED Lights',
    type: AssetType.PRODUCT,
    description: 'Bright and colorful LED lights for event ambiance and decoration.'
  },
  {
    name: 'Projector',
    type: AssetType.PRODUCT,
    description: 'A portable projector for displaying slideshows and presentations at events.'
  },
  {
    name: 'Event Chairs',
    type: AssetType.PRODUCT,
    description: 'Comfortable chairs for guests to sit during an event.'
  },

  // Services
  {
    name: 'Event Planning',
    type: AssetType.SERVICE,
    description: 'Complete event planning services, including venue selection, logistics, and coordination.'
  },
  {
    name: 'Catering',
    type: AssetType.SERVICE,
    description: 'Event catering services offering food and drink for events.'
  },
  {
    name: 'Sound & Light Setup',
    type: AssetType.SERVICE,
    description: 'Service for setting up sound systems and lighting equipment for events.'
  },
  {
    name: 'Photography',
    type: AssetType.SERVICE,
    description: 'Professional photography services to capture moments during the event.'
  },
  {
    name: 'Security',
    type: AssetType.SERVICE,
    description: 'Security services to ensure the safety of guests and the smooth operation of the event.'
  }
];
@Injectable({
  providedIn: 'root'
})
export class AssetService {
  assets: Asset[];
  constructor() {
    this.assets = [];
    for (const assetObj of assets) {
      const asset = {
        name : assetObj.name,
        type : assetObj.type,
        description : assetObj.description,
      }
      this.assets.push(asset);
    }
  }

  getAll(): Asset[] {
    return this.assets;
  }

  addAsset(asset: Asset) {
    this.assets.push(asset);
  }
}
