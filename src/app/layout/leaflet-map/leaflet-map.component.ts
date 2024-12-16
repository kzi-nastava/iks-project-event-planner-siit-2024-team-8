import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.css'
})
export class LeafletMapComponent {
  ngAfterViewInit(): void {
    setTimeout(() => {
      const map = L.map('map').setView([45.2671, 19.8335], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([45.2517, 19.8380]).addTo(map)
        .bindPopup('Choose location.')
        .openPopup();
    }, 0);
  }
}
