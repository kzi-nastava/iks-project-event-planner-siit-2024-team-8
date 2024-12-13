import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService } from './product-service';
import { UtilityService } from './utility-service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utility } from '../model/utility';
import { Asset } from '../model/asset';

@Injectable({
    providedIn: 'root'
  })
  export class AssetService {
    constructor(
      private productService: ProductService,
      private utilityService: UtilityService
    ) {}
  
    getAllAssets(): Observable<any> {
      return forkJoin({
        products: this.productService.getAllProducts(),
        utilities: this.utilityService.getAllUtilities()
      }).pipe(
        map((response) => {
          return {
            products: response.products,
            utilities: response.utilities
          };
        })
      );
    }

    isUtility(asset: Asset): asset is Utility {
        return (asset as Utility).duration !== undefined;
      }
  }