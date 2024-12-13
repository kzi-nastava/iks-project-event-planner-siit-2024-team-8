import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product'

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

  createProduct(formData: FormData): Observable<Object> {
    return this.http.post(this.apiUrl, formData);
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
}