import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {EndPointsConfig} from "../Config";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {URLSearchParams} from '@angular/http';
import {PurchasePlatformOrderNote, UnpackPackageInfoModel} from "../models/purchases/unpack-package-info-model";

@Injectable()
export class UnpackPackageService {

  constructor(public apiService: ApiService) {
  }

  searchUnpackPackageInfo(warehouseId: any, searchType: string, text: string):
           Observable<ApiResponseBaseModel<UnpackPackageInfoModel[]>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('searchType', searchType);
    searchParams.set('text', text);

    return this.apiService.get(EndPointsConfig.EndPoints.WarehouseUnpack_SearchOrderInfo, searchParams);
  }
  addWarehouseNote(data: any): Observable<ApiResponseBaseModel<any>> {

    return this.apiService.post(EndPointsConfig.EndPoints.WarehouseUnpack_PurchasePlatformOrderNote, data);
  }
  getPurchasePlatformOrderNotes(purchasePlatformOrderId: number)
    : Observable<ApiResponseBaseModel<PurchasePlatformOrderNote[]>> {
    const searchParams = new URLSearchParams();
    searchParams.set('purchasePlatformOrderId', purchasePlatformOrderId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.WarehouseUnpack_GetPurchasePlatformOrderNotes, searchParams);
  }
  doUnpackInstock(data: any): Observable<ApiResponseBaseModel<any>> {

    return this.apiService.post(EndPointsConfig.EndPoints.WarehouseUnpack_DoInstock, data);
  }
}
