
import {Injectable} from "@angular/core";
import {ApiService} from "../../../../shared/services/api.service";
import {Observable} from "rxjs/Observable";
import {EndPointsConfig} from "../../../../shared/Config";
import {ApiResponseBaseModel} from "../../../../shared/models/api.response.basemodel";
import {URLSearchParams} from "@angular/http"

@Injectable()
export class FreightChargeService {
  constructor(public apiService: ApiService) {

  }
  getWarehouseShippingServiceForPackage( warehouseId:number, spId: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('spId', spId);
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingService_GetWarehouseShippingServiceForPackage, searchParams);
  }

  getSpServiceForPackage( warehouseId:number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingService_GetSpServiceForPackage, searchParams);
  }

  getStorageData(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }

  getAllCountries(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Common_Get_All_Countries);
  }

  shippingFeeRuleFinanceListQuery( param:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.ShippingService_ShippingFeeRuleFinanceListQuery, param);
  }
}
