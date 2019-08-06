import {Injectable} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {Observable} from "rxjs/Observable";
import {URLSearchParams} from "@angular/http"
import {EndPointsConfig} from "../../../shared/Config";
import {ApiResponseBaseModel} from "../../../shared/models/api.response.basemodel";
import {WarehouseSearchModel} from "../../../shared/models/warehouses/warehouse-storeage-model";
import {Subject} from "rxjs/Subject";
import { ApiPageList } from "../../../shared/models/page-list.model";

@Injectable()
export class StockService{
  markPackageFail=new Subject();
  constructor(private apiService: ApiService){
  }
  sendMarkPackageFailEvent(val){
    this.markPackageFail.next(val);
  }
  getMarkPackageFailEvent(){
    return this.markPackageFail.asObservable();
  }
  GetStorageData(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }
  GetWarehouseStoreageQuery(param:WarehouseSearchModel):Observable<ApiResponseBaseModel<any>> {

    const data = {
      WareName:param.wareName,
      LocationType:param.locationType,
      LockedType:param.lockedType,
      SearchType : param.searchType,
      SearchText: param.searchText,
      PageIndex: param.pageIndex,
      PageSize: param.pageSize,
      SortType:param.sortType,
      SortOrder:param.sortOrder
    };
  return this.apiService.post(EndPointsConfig.EndPoints.GetWarehouseStoreage,data);
}

  lockInventory(inventoryId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id',inventoryId && inventoryId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Inventory_Lock, null, searchParams)
  }

  unLockInventory(inventoryId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id',inventoryId && inventoryId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Inventory_Unlock, null, searchParams)
  }
  getReserInfo(inventoryId: number,searchType: string, searchText: string, pageIndex: number, pageSize: number)
  : Observable<ApiResponseBaseModel<ApiPageList<any>>> {
    const searchParams = new URLSearchParams();
    searchParams.set('InventoryId',inventoryId && inventoryId.toString()); 
    searchParams.set('searchType',searchType);
    searchParams.set('SearchText',searchText);
    searchParams.set('pageIndex',pageIndex.toString());
    searchParams.set('pageSize',pageSize.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Inventory_ReserveInfo, searchParams)
  }
  reportLoss=[];
  reportOverflow=[];
  storageData=[];
}
