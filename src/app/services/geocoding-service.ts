import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: HttpClient) {}

  getCoordinates(address: string): Observable<any> {
    const encodedAddress = encodeURIComponent(address);  // Encode address to handle special characters
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

    return this.http.get<any>(apiUrl);
  }
}
