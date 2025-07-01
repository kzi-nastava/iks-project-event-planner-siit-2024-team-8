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

    filterAssets(request : SearchAssetsRequest, pageProperties? :any): Observable<PagedResponse<AssetResponse>> {
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
        params = params
          .set('page', pageProperties.page)
          .set('size', pageProperties.pageSize);
      }

      return this.http.get<PagedResponse<AssetResponse>>(`${environment.apiHost + this.apiUrl}/filter`, {params: params});
    }

    isUtility(asset: Asset): asset is Utility {
        return (asset as Utility).duration !== undefined;
      }
  }
