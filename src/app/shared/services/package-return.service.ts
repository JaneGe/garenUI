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
import {ApiPageList} from "../models/page-list.model";
import {PackageReturnListModel} from "../models/Package/paclage-return-list-model";


@Injectable()
export class PackageReturnService {
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

  AssignedPickTaskToUserById(workNo: string) {
    const searchParams = new URLSearchParams();
    searchParams.set('WorkNo', workNo);
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Picking_AssignedPickTaskToUserById, searchParams);
  }

  getPendingHandlePackageInfo(wareName: string): Observable<ApiResponseBaseModel<number>> {
    const searchParams = new URLSearchParams();
    searchParams.set('wareName', wareName);
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_PendingGeneratePickingPackageCount, searchParams);
  }

  generatePicking(wareHouseId: string): Observable<ApiResponseBaseModel<number>> {
    const searchParams = new URLSearchParams();
    searchParams.set('wareHouseId', wareHouseId);
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Picking_Manual_GeneratePicking, null, searchParams);
  }

  getRecordPageList(pageIndex: number, pageSize: number, warehouseId: number, searchType: string, searchText: string,
                    timeValueType: string, dateFrom: Date,
                    dateTo: Date): Observable<ApiResponseBaseModel<ApiPageList<PackageReturnListModel>>> {

    const searchParams = new URLSearchParams();
    pageIndex = pageIndex - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('timeValueType', timeValueType);
    if (timeValueType == 'Custom') {
      searchParams.set('dateFrom', dateFrom.toLocaleDateString());
      searchParams.set('dateTo', dateTo.toLocaleDateString());
    }


    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Package_Return_Records_PageList, searchParams);
  }

  addReturnRecord(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Package_Return_Records_Add, data);
  }

  getReturnRecordNote(packageReturnRecordId: number): Observable<ApiResponseBaseModel<string>> {
    const searchParams = new URLSearchParams();
    searchParams.set('recordId', packageReturnRecordId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_Package_Return_Records_GetNote, searchParams);
  }

  addReturnRecordNote(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Package_Return_Records_SetNote, data);
  }

  markReturnRecordPackageShipped(postData: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Package_Return_Records_MarkShipped, postData);
  }
}
