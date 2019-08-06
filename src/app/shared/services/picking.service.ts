import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {PackingTaskModel} from "../models/warehouses/packing-task-model";
import {URLSearchParams} from "@angular/http";
import {PickingSecondInfoModel} from "../models/pickings/picking-second-info-model";
import {PickingSkuSecondResultModel} from "../models/pickings/picking-sku-second-result-model";
import {PackagePickUpFailModel} from "../models/pickings/picking-task-model";


@Injectable()
export class PickingService {
  constructor(public apiService: ApiService) {

  }

  GetStorageData(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }

  GetPickTaskQuery(param: PackingTaskModel): Observable<ApiResponseBaseModel<any>> {
    const data = {
      WareHouseId: param.wareHouseId,
      SearchText: param.searchText,
      PageIndex: param.pageIndex,
      PageSize: param.pageSize,
      Status: param.status
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_PickTask_List, data);
  }

  AssignedPickTaskToUserById(warehouseId:string, workNo:string){
    const searchParams = new URLSearchParams();
    searchParams.set('WorkNo', workNo);
    searchParams.set('warehouseId', warehouseId);
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Picking_AssignedPickTaskToUserById, searchParams);
  }

  getPendingHandlePackageInfo(wareName: string): Observable<ApiResponseBaseModel<number>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', wareName);
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_PendingGeneratePickingPackageCount, searchParams);
  }

  generatePicking(wareHouseId: string): Observable<ApiResponseBaseModel<number>> {
    const searchParams = new URLSearchParams();
    searchParams.set('wareHouseId', wareHouseId);
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Picking_Manual_GeneratePicking, null, searchParams);
  }

  GetAllUsers(): Observable<ApiResponseBaseModel<any>> {

    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_GetAllUsers);
  }

  UpdatePickTask(pickId: number, pickUserId: string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('pickId', pickId.toString());
    searchParams.set('pickUserId', pickUserId);
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_UpdatePickTask, searchParams);
  }


  getPickingSecondInfo(warehouseId: number, pickingNumber: string)
  : Observable<ApiResponseBaseModel<PickingSecondInfoModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('pickingNumber', pickingNumber);
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Picking_Second_PickingInfo, searchParams);
  }

  doPickingSecondPickingSku(pickingId: number, skuCode: string)
  : Observable<ApiResponseBaseModel<PickingSkuSecondResultModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('pickingId', pickingId.toString());
    searchParams.set('skuCode', skuCode);
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Picking_Second_Picking_Sku, null, searchParams);
  }
  preAllocateUnScanPackages(pickingId: number)
  : Observable<ApiResponseBaseModel<PickingSkuSecondResultModel[]>> {
    const searchParams = new URLSearchParams();
    searchParams.set('pickingId', pickingId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Picking_Second_Pre_Allocate_UnScanPackages,
      null, searchParams);
  }

  PickTaskForSkuById(pickingId: number,pageIndex:number,pageSize:number,searchText: string): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    searchParams.set('PickingId', pickingId.toString());
    searchParams.set('PageIndex', pageIndex.toString());
    searchParams.set('PageSize', pageSize.toString());

    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Picking_PickTaskForSkuById, searchParams);
  }

  PickTaskForSkuDetailById(packageId:number,pageIndex:number,pageSize:number): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    searchParams.set('PageIndex', pageIndex.toString());
    searchParams.set('PageSize', pageSize.toString());
    searchParams.set('PackageId', packageId && packageId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Picking_PickTaskForSkuDetailById, searchParams);
  }


  PickPackageDetailById(pickingId: number,pageIndex:number,pageSize:number,selectSearchType:string,searchText:string,
                        selectPrintState:string,selectShippingState:string): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    searchParams.set('PickingId', pickingId.toString());
    searchParams.set('PageIndex', pageIndex.toString());
    searchParams.set('PageSize', pageSize.toString());
    searchParams.set('searchType',selectSearchType);
    searchParams.set('printStatus',selectPrintState);
    searchParams.set('shippingStatus',selectShippingState);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Picking_PickPackageDetailById, searchParams);
  }

  PickUpPackageFailed(param: PackagePickUpFailModel): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Picking_PickUpPackageFailed, param);
  }
  GetPickPrintQuery(pickId:any): Observable<ApiResponseBaseModel<any[]>> {
    const searchParams = new URLSearchParams();
    searchParams.set('pickId', pickId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Package_GetPickPrintQuery,searchParams);
  }

  setDanPinPackagePickingFailed(pickingId: number, packageId: number, pickQuantity: number)
  : Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('pickingId', pickingId.toString());
    searchParams.set('packageId', packageId.toString());
    searchParams.set('pickQuantity', pickQuantity.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Picking_SetDanPinPackageFailed,
      null, searchParams);
  }
}
