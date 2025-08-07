import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {ProductService} from './product-service';
import {UtilityService} from './utility-service';
import {map} from 'rxjs/operators';
import {Utility} from '../model/utility';
import {Asset} from '../model/asset';
import {PagedResponse} from '../shared/model/paged.response';
import {AssetResponse} from '../model/asset.response';
import {environment} from '../../env/environment';
import {SearchAssetsRequest} from '../model/search.assets.request';
import {PageProperties} from '../model/page.properties';

@Injectable({
    providedIn: 'root'
  })
  export class AssetService {

    private apiUrl = "/assets"
    constructor(
      private productService: ProductService,
      private utilityService: UtilityService,
      private http: HttpClient
    ) {}

    getAllAssets(): Observable<any> {
      return forkJoin({
        products: this.productService.getAllProducts(),
        utilities: this.utilityService.getAllUtilities()
      }).pipe(
        map((response) => {
          return [
            ...this.mapToAssetResponse(response.products, 'PRODUCT'),
            ...this.mapToAssetResponse(response.utilities, 'UTILITY')
          ];
        })
      );
    }
  private mapToAssetResponse(assets: any[], type: string): AssetResponse[] {
    return assets.map(asset => ({
      id: asset.id,
      name: asset.name,
      type: type,
      images: asset.images || [],
      category: asset.category || null
    }));
  }

    filterAssets(request : SearchAssetsRequest, pageProperties? :PageProperties): Observable<PagedResponse<AssetResponse>> {
      let params : HttpParams = new HttpParams();
      Object.entries(request).forEach(([key, value]) => {
        if (key !== 'startDate' && key !== 'endDate' && value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              params = params.append(key, item);
            });
          } else {
            params = params.set(key, value as string);
          }
        }
      });

      if (pageProperties) {
        if (pageProperties.sortBy !== null) {
          params = params.set('sortBy', pageProperties.sortBy);
        }

        if (pageProperties.sortOrder !== null) {
          params = params.set('sortOrder', pageProperties.sortOrder);
        }
        params = params
          .set('page', pageProperties.page)
          .set('size', pageProperties.pageSize)
      }

      return this.http.get<PagedResponse<AssetResponse>>(`${environment.apiHost + this.apiUrl}/filter`, {params: params});
    }

    getAssetsByProviderId(providerId: string): Observable<AssetResponse[]> {
      return forkJoin({
        products: this.http.get<any[]>(`${environment.apiHost}/products/provider/${providerId}`),
        utilities: this.http.get<any[]>(`${environment.apiHost}/utilities/provider/${providerId}`)
      }).pipe(
        map(response => [
          ...this.mapToAssetResponse(response.products, 'PRODUCT'),
          ...this.mapToAssetResponse(response.utilities, 'UTILITY')
        ])
      );
    }
    getTop5Assets() : Observable<AssetResponse[]> {
      return this.http.get<AssetResponse[]>(`${environment.apiHost + this.apiUrl}/top5`)
    }
  }
