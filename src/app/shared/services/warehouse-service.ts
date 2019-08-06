import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {ApiService} from './api.service';
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {WarehouseOptionModel} from "../models/warehouses/warehouse-option-model";
import {ApiPageList} from "../models/page-list.model";
import {URLSearchParams} from "@angular/http";
import {WarehouseListModel} from "../models/warehouses/warehouse-model";
import {WarehouseDetailModel} from "../models/warehouses/warehouse-detail-model";
import {LocationCodeListModel} from "../models/warehouses/location-code-list-model";
import {WarehouseAreaListModel} from "../models/warehouses/warehouse-area-list-model";

@Injectable()
export class WarehouseService {
  constructor(public apiService: ApiService) {

  }

  public getAllOptions(): Observable<ApiResponseBaseModel<WarehouseOptionModel[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }

  public warehousePageList(pageNumber: number, pageSize: number):
  Observable<ApiResponseBaseModel<ApiPageList<WarehouseListModel>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());


    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Page_List, searchParams);
  }

  public setWarehouseStatus(warehouseId: number, isActive: boolean): Observable<any> {
    let data = {id: warehouseId, isActive};

    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Set_Warehouse_Status, data);
  }

  public getWarehouseDetail(warehouseId: number): Observable<ApiResponseBaseModel<WarehouseDetailModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());


    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Get_WarehoseDetail, searchParams);

  }

  public addWarehouse(warehouse: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Add_Warehouse, warehouse);

  }

  public updateWarehouseDetail(warehouse: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Edit_Warehouse, warehouse);
  }

  getWarehouseBatchSetting(warehouseId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());


    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Get_Warehouse_Batch_Setting, searchParams);
  }

  saveWarehouseBatchSetting(data: any): Observable<ApiResponseBaseModel<any>> {


    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Save_Warehouse_Batch_Setting, data);
  }

  getLocationCodePageList(warehouseId: number, searchText: string, areacode: string, pageNumber: number,
                          pageSize: number,selectLocationTypes:string,isUsing: string)
  : Observable<ApiResponseBaseModel<ApiPageList<LocationCodeListModel>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }


    const searchParams = new URLSearchParams();
    searchParams.set('locationType', selectLocationTypes);
    searchParams.set('isUsing', isUsing);
    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('areacode', areacode);
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Get_LocationPageList, searchParams);
  }

  addLocationCode(data: any): Observable<ApiResponseBaseModel<any>> {

    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Add_Location_Code, data);
  }

  deleteLocationCode(locationId: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('locationId', locationId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Delete_Location_Code, null, searchParams);
  }
  lockLocationCode(locationId: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('locationId', locationId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Lock_Location_Code, null, searchParams);
  }
  unlockLocationCode(locationId: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('locationId', locationId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Unlock_Location_Code, null, searchParams);
  }
  public getWarehouseAreas(warehouseId: number): Observable<ApiResponseBaseModel<WarehouseAreaListModel[]>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Area_List, searchParams);
  }
  lockArea(warehouseId: any,areaId: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('areaId', areaId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Area_Lock, null, searchParams);
  }
  unlockArea(warehouseId: any,areaId: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('areaId', areaId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Area_Unlock, null, searchParams);
  }
}
