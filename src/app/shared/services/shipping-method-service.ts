import {EndPointsConfig} from "../Config";
import {ShippingMethodListModel} from "../models/warehouses/shipping-method-list-model";
import {ApiPageList} from "../models/page-list.model";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {URLSearchParams} from "@angular/http";
import {ShippingServiceFeeRuleDetailModel} from "../models/logistics/shipping-service-fee-rule-detail-model";
import {WarehouseShippingServiceOptionModel} from "../models/warehouses/warehouse-shipping-service-option-model";
import {ShippingServiceSettingDetailModel} from "../models/logistics/shipping-service-setting-detail-model";

@Injectable()
export class ShippingMethodService {
  constructor(public apiService: ApiService) {

  }

  public getShippingMethodes(pageNumber: number, pageSize: number, searchText: string, warehouseId: number,
                             spId: number, isShippingMethodsUsing: boolean, selectedSearchType: string):
  Observable<ApiResponseBaseModel<ApiPageList<ShippingMethodListModel>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    let searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('searchText', searchText);
    searchParams.set('searchType', selectedSearchType);
    if (isShippingMethodsUsing != null) {
      searchParams.set('isUsing', isShippingMethodsUsing.toString());
    }
    if (spId != null) {
      searchParams.set('spId', spId.toString());
    }
    searchParams.set('warehouseId', warehouseId.toString());


    return this.apiService.get(EndPointsConfig.EndPoints.ShippingService_Page_List, searchParams);
  }

  selectShippingService(ssId: number, selectedWarehouseId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('ssId', ssId.toString());
    searchParams.set('warehouseId', selectedWarehouseId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.ShippingService_Select_Ss, null, searchParams);
  }

  unSelectShippingService(ssId: number, selectedWarehouseId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('ssId', ssId.toString());
    searchParams.set('warehouseId', selectedWarehouseId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.ShippingService_UnSelect_Ss, null, searchParams);
  }

  deleteCustomShippingService(ssId: number) {
    const searchParams = new URLSearchParams();
    searchParams.set('ssId', ssId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.ShippingService_Delete_Custom_Service, null, searchParams);
  }

  getShippingRules(ssId: number, pageNumber: number, pageSize: number): Observable<ApiResponseBaseModel<ApiPageList<any>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('ssId', ssId.toString());
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingService_Fee_Rule_Page_List, searchParams);
  }

  getShippingRuleDetail(ssId: number, ruleId: number): Observable<ApiResponseBaseModel<ShippingServiceFeeRuleDetailModel>> {

    const searchParams = new URLSearchParams();
    searchParams.set('ssId', ssId.toString());
    searchParams.set('ruleId', ruleId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingService_Fee_Rule_Detail, searchParams);
  }

  saveShippingFeeRuleInfo(data: any): Observable<ApiResponseBaseModel<any>> {
    console.info(data);
    return this.apiService.post(EndPointsConfig.EndPoints.ShippingService_Fee_Rule_Save, data);
  }

  deleteShippingFeeRule(ruleId: number, ssId: number): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('ssId', ssId.toString());
    searchParams.set('ruleId', ruleId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.ShippingService_Fee_Rule_Delete, null, searchParams);
  }

  getWarehouseAllSelectedShippingService(warehouseId: number): Observable<ApiResponseBaseModel<WarehouseShippingServiceOptionModel[]>> {

    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId && warehouseId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingService_Warehouse_All_Active_Service, searchParams);
  }

  getWarehousePocketShippingService(warehouseId: number, isPocket: any): Observable<ApiResponseBaseModel<WarehouseShippingServiceOptionModel[]>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId && warehouseId.toString());
    searchParams.set('isPocket', isPocket.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingService_Warehouse_Pocket, searchParams);
  }

  getShippingServiceDetail(warehouseId: number, ssId: number): Observable<ApiResponseBaseModel<ShippingServiceSettingDetailModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('ssId', ssId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingService_Detail, searchParams);
  }


  saveServiceSetting(warehouseId: number, ssId: number, data: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('ssId', ssId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.ShippingService_Detail_SaveSetting, data, searchParams);
  }

  createServiceSetting(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.ShippingService_Create, data);
  }

  fakeTrackingNumberList(ssId, pageNumber: number, pageSize: number): Observable<ApiResponseBaseModel<ApiPageList<any>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('ssId', ssId.toString());


    return this.apiService.get(EndPointsConfig.EndPoints.ShippingService_Method_ListFakeTrackingNumbers,searchParams);
  }

  deleteFakeTrackingNumber(fakeTrackingNuberId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('trackingNumberId', fakeTrackingNuberId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.ShippingService_Method_DeleteFakeTrackingNumber,
      null, searchParams);
  }
}


