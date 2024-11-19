import { Injectable } from '@angular/core';
import { Asset, AssetType } from '../model/asset';

export const assets: Asset[] = [
  // Products
  {
    name: 'Balloons',
    type: AssetType.PRODUCT,
    description: 'Colorful balloons for decoration at parties or events.',
    category: 'Decoration',
    price: 30,
    discount: 10,
    images: ['url1', 'url2'], 
    eventTypes: ['Party', 'Wedding'],
    visibility: true,
    availability: true,
    duration: 0, 
    bookingDeadline: '',
    cancellationDeadline: '',
    confirmationMethod: 'automatic',
  },
  {
    name: 'Soundbar',
    type: AssetType.PRODUCT,
    description: 'A high-quality soundbar for audio enhancement at events.',
    category: 'Audio Equipment',
    price: 150,
    discount: 5,
    images: ['url3', 'url4'],
    eventTypes: ['Conference', 'Wedding', 'Party'],
    visibility: true,
    availability: true,
    duration: 0, 
    bookingDeadline: '',
    cancellationDeadline: '',
    confirmationMethod: 'manual',
  },
  {
    name: 'LED Lights',
    type: AssetType.PRODUCT,
    description: 'Bright and colorful LED lights for event ambiance and decoration.',
    category: 'Lighting',
    price: 80,
    discount: 20,
    images: ['url5', 'url6'],
    eventTypes: ['Wedding', 'Party'],
    visibility: true,
    availability: true,
    duration: 0, 
    bookingDeadline: '',
    cancellationDeadline: '',
    confirmationMethod: 'automatic',
  },
  {
    name: 'Projector',
    type: AssetType.PRODUCT,
    description: 'A portable projector for displaying slideshows and presentations at events.',
    category: 'Audio Visual Equipment',
    price: 200,
    discount: 15,
    images: ['url7', 'url8'],
    eventTypes: ['Conference', 'Presentation'],
    visibility: true,
    availability: true,
    duration: 0, 
    bookingDeadline: '',
    cancellationDeadline: '',
    confirmationMethod: 'manual',
  },
  {
    name: 'Event Chairs',
    type: AssetType.PRODUCT,
    description: 'Comfortable chairs for guests to sit during an event.',
    category: 'Furniture',
    price: 25,
    discount: 0,
    images: ['url9', 'url10'],
    eventTypes: ['Wedding', 'Conference', 'Party'],
    visibility: true,
    availability: true,
    duration: 0, 
    bookingDeadline: '',
    cancellationDeadline: '',
    confirmationMethod: 'automatic',
  },

  // Services
  {
    name: 'Event Planning',
    type: AssetType.SERVICE,
    description: 'Complete event planning services, including venue selection, logistics, and coordination.',
    category: 'Event Management',
    price: 1000,
    discount: 5,
    images: ['serviceImage1', 'serviceImage2'],
    eventTypes: ['Wedding', 'Conference', 'Party'],
    visibility: true,
    availability: true,
    duration: 8, 
    bookingDeadline: '2024-12-01',
    cancellationDeadline: '2024-12-05',
    confirmationMethod: 'manual',
  },
  {
    name: 'Catering',
    type: AssetType.SERVICE,
    description: 'Event catering services offering food and drink for events.',
    category: 'Food & Drink',
    price: 500,
    discount: 10,
    images: ['serviceImage3', 'serviceImage4'],
    eventTypes: ['Wedding', 'Conference', 'Party'],
    visibility: true,
    availability: true,
    duration: 4,
    bookingDeadline: '2024-12-01',
    cancellationDeadline: '2024-12-05',
    confirmationMethod: 'automatic',
  },
  {
    name: 'Sound & Light Setup',
    type: AssetType.SERVICE,
    description: 'Service for setting up sound systems and lighting equipment for events.',
    category: 'Audio & Lighting',
    price: 400,
    discount: 5,
    images: ['serviceImage5', 'serviceImage6'],
    eventTypes: ['Wedding', 'Party', 'Concert'],
    visibility: true,
    availability: true,
    duration: 6, 
    bookingDeadline: '2024-12-02',
    cancellationDeadline: '2024-12-06',
    confirmationMethod: 'automatic',
  },
  {
    name: 'Photography',
    type: AssetType.SERVICE,
    description: 'Professional photography services to capture moments during the event.',
    category: 'Photography',
    price: 700,
    discount: 15,
    images: ['serviceImage7', 'serviceImage8'],
    eventTypes: ['Wedding', 'Conference', 'Party'],
    visibility: true,
    availability: true,
    duration: 5, 
    bookingDeadline: '2024-12-03',
    cancellationDeadline: '2024-12-07',
    confirmationMethod: 'manual',
  },
  {
    name: 'Security',
    type: AssetType.SERVICE,
    description: 'Security services to ensure the safety of guests and the smooth operation of the event.',
    category: 'Security',
    price: 300,
    discount: 0,
    images: ['serviceImage9', 'serviceImage10'],
    eventTypes: ['Wedding', 'Conference', 'Concert'],
    visibility: true,
    availability: true,
    duration: 6, 
    bookingDeadline: '2024-12-05',
    cancellationDeadline: '2024-12-10',
    confirmationMethod: 'automatic',
  }
];

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private assets: Asset[] = [];
  private selectedAsset: Asset | null = null;

  constructor() {
    this.assets = assets;
  }

  getAll(): Asset[] {
    return this.assets;
  }

  addAsset(asset: Asset): void {
    this.assets.push(asset);
  }

  setSelectedAsset(asset: Asset): void {
    this.selectedAsset = asset;
  }

  getSelectedAsset(): Asset | null {
    return this.selectedAsset;
  }

  clearSelectedAsset(): void {
    this.selectedAsset = null;
  }
}
