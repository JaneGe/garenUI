import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiPageList} from "../models/page-list.model";
import {SkuListModel} from "../models/products/sku-list-model";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http"
import {SkuDetailModel} from "../models/products/sku-detail-model";
import {PurchaseAddParam} from "../models/purchases/purchase-url-model";
import {SkuSearchLiteModel} from "../models/products/sku-search-lite-model";


@Injectable()
export class BrandService {
  constructor(private apiService: ApiService) {

  }


  getBrandList(searchText: string = null): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    if(searchText == ''){
      searchText = null;
    }
    searchParams.set('searchText', searchText);
    return this.apiService.get(EndPointsConfig.EndPoints.Brand_PageList, searchParams);
  }

  saveBrandInfo(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Brand_Save, data);
  }

  getBrandDetail(brandId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('brandId', brandId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Brand_Detail, searchParams);
  }

  deleteBrand(brandId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('brandId', brandId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Brand_Delete, null, searchParams);
  }

}
