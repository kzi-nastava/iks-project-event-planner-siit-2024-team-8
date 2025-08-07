import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import {GeocodingService} from '../../services/geocoding-service';
import {icon, Marker} from 'leaflet';
import {Location} from '../../event/domain/location';
import {map} from 'rxjs/operators';
import {LocationDTO} from '../../event/domain/EventUpdateRequest';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.css'
})
export class LeafletMapComponent {
  marker : L.Marker;
  map: L.Map
  mapInitialized: boolean = false;

  @Input()
  location : LocationDTO | Location;

  @Output()
  newLocation: EventEmitter<Location> = new EventEmitter();


  private greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', // Green marker icon URL
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41], // Size of the shadow
  });

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeMapSafely();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location']) {
      console.log('location changed:', this.location);
      if (this.mapInitialized) {
        this.updateMap();
      }
    }
  }

  private updateMap(): void {
    if (!this.map || !this.location) return;
    if (this.location.latitude === 0 && this.location.longitude === 0) {return;}

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    const { latitude, longitude } = this.location;

    this.marker = L.marker([latitude, longitude],{icon : this.greenIcon});
    this.marker.addTo(this.map)
      .bindPopup(`${this.location.city}, ${this.location.street}`)
      .openPopup();

    this.map.setView([latitude, longitude], 13);
  }

  initializeMap() : void{
    this.map = L.map('map').setView([45.2671, 19.8335], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.marker = new L.Marker([45.2517, 19.8380], {icon: this.greenIcon});
    this.marker.addTo(this.map)
      .bindPopup('Choose location.')
      .openPopup();
  }

  initializeMapSafely(): void {
    const mapElement = document.getElementById('map');

    if (!mapElement) {
      console.error('Map container not found — delaying retry.');
      setTimeout(() => this.initializeMapSafely(), 50); // Retry after small delay
      return;
    }

    if (this.mapInitialized) return;

    this.map = L.map(mapElement).setView([45.2671, 19.8335], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker([45.2517, 19.8380], { icon: this.greenIcon });
    this.marker.addTo(this.map)
      .bindPopup('Choose location.')
      .openPopup();

    this.mapInitialized = true;

    if (this.location && this.location.latitude !== 0 && this.location.longitude !== 0) {
      this.updateMap();
    }
  }

}
