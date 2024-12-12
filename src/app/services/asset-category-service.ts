import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetCategory } from '../model/asset-category';  
import { map } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class AssetCategoryService {

  private apiUrl = 'http://localhost:8080/api/asset-categories';  

  constructor(private http: HttpClient) {}

  getActiveCategories(): Observable<AssetCategory[]> {
    return this.http.get<AssetCategory[]>(`${this.apiUrl}/active`);
  }

  getActiveUtilityCategories(): Observable<AssetCategory[]> {
    console.log('tried getting active product categories');
    return this.getActiveCategories().pipe(
      map(categories => categories.filter(category => category.type === 'UTILITY'))
    );
  }

  getActiveProductCategories(): Observable<AssetCategory[]> {
    console.log('tried getting active product categories');
    return this.getActiveCategories().pipe(
      map(categories => categories.filter(category => category.type === 'PRODUCT'))
    );
  }

  getPendingCategories(): Observable<AssetCategory[]> {
    return this.http.get<AssetCategory[]>(`${this.apiUrl}/pending`);
  }

  getCategoryById(id: string): Observable<AssetCategory> {
    return this.http.get<AssetCategory>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: AssetCategory): Observable<AssetCategory> {
    return this.http.post<AssetCategory>(this.apiUrl, category);
  }

  updateCategory(id: string, category: AssetCategory): Observable<AssetCategory> {
    return this.http.put<AssetCategory>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  approveCategory(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/pending/${id}`, null); 
  }
}