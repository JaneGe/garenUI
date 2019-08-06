import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiPageList} from "../models/page-list.model";
import {VirtualSkuDetailModel} from "../models/products/virtual-sku-detail-model";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class VirtualSkuDetailervice {
  constructor(private apiService: ApiService) {
  }


  getPageList(searchText: string)
    : Observable<ApiResponseBaseModel<ApiPageList<VirtualSkuDetailModel>>> {
    const searchParams = new URLSearchParams();
    searchParams.set('searchText', searchText);
    return this.apiService.get(EndPointsConfig.EndPoints.Sku_PageList, searchParams);
  }



  getVirtualSkuDetail(skuId: number): Observable<ApiResponseBaseModel<VirtualSkuDetailModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('skuId', skuId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Virtual_Sku_Detail, searchParams);
  }


  saveSkuInfo(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Virtual_Sku_Sku_Save, data);
  }
}
