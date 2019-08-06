import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {URLSearchParams} from "@angular/http";
import {ApiPageList} from "../models/page-list.model";
import {PickingFailSkusListModel} from "../models/pickings/picking-fail-skus-list-model";
import {PickingFailCheckingTaskListModel} from "../models/pickings/picking-fail-checking-task-list-model";
import {CheckingStockTaskPrintDataModel} from "../models/pickings/checking-stock-task-print-data-model";
import {PackagePickingFailLackInfoModel} from "../models/pickings/package-picking-fail-lack-info-model";


@Injectable()
export class PickingFaileRecordService {
  constructor(public apiService: ApiService) {
  }
  getPickingFailSkusList(selectedWarehouseId: number, selectedTimeValueType: string, timeSearchStart: string,
                            timeSearchEnd: string, searchText: string, selectSearchType: string, pageNumber: number,
                            pageSize: number)
                           : Observable<ApiResponseBaseModel<ApiPageList<PickingFailSkusListModel>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('selectedWarehouseId', selectedWarehouseId && selectedWarehouseId.toString());
    searchParams.set('timeValueType', selectedTimeValueType);
    searchParams.set('timeStart', timeSearchStart);
    searchParams.set('timeEnd', timeSearchEnd);
    searchParams.set('searchType', selectSearchType);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }

    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_PickingFailRecord_SkuList, searchParams);
  }

  getCheckingInventoryTaskList(selectedWarehouseId: number, selectedTimeValueType: string, timeSearchStart: string,
                         timeSearchEnd: string, searchText: string, selectSearchType: string, pageNumber: number,
                         pageSize: number)
  : Observable<ApiResponseBaseModel<ApiPageList<PickingFailCheckingTaskListModel>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('selectedWarehouseId', selectedWarehouseId && selectedWarehouseId.toString());
    searchParams.set('timeValueType', selectedTimeValueType);
    searchParams.set('timeStart', timeSearchStart);
    searchParams.set('timeEnd', timeSearchEnd);
    searchParams.set('searchType', selectSearchType);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_PickingFailRecord_CheckingStockTaskList, searchParams);
  }


  createCheckingStockTask(data: any): Observable<ApiResponseBaseModel<ApiPageList<any>>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_PickingFailRecord_CreateCheckingStockTask, data);
  }


  getCheckingInventoryTaskPrintData(taskId: number)
  : Observable<ApiResponseBaseModel<CheckingStockTaskPrintDataModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('taskId', taskId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_PickingFailRecord_TaskPrintData, searchParams);
  }

  getFailPackagePurchaseInfo(packageId: number)
  : Observable<ApiResponseBaseModel<PackagePickingFailLackInfoModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('packageId', packageId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_PickingFailRecord_GetPackagePickingFailDetail, searchParams);
  }

  confirmPurchase(postData: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_PickingFailRecord_ConfirmPurchase, postData);
  }
}
