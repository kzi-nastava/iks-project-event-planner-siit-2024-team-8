import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product'
import {Review} from '../model/review';
import {environment} from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/all`);
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductVersionById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/product-versions/${id}`);
  }

  createProduct(formData: FormData): Observable<string> {
    return this.http.post(this.apiUrl, formData, { responseType: 'text' });
  }

  updateProduct(id: string, formData: FormData): Observable<Object> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addProductToFavorites(id: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${id}/favorite`, null);
  }

  removeProductFromFavorites(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}/favorite`);
  }

  submitReview(id: string, reviewData: any) {
    return this.http.post(`${this.apiUrl}/${id}/review`, reviewData);
  }
}
