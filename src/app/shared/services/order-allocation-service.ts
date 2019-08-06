import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {ApiPageList} from "../models/page-list.model";
import {EndPointsConfig} from "../Config";
import {URLSearchParams} from "@angular/http"
import {PendingGroupAllocationOrderListModel} from "../models/orders/pending-allocation-order-list-model";
import {BatchGeneratePackageResultModel} from "../models/Package/batch-generate-package-result-model";


@Injectable()
export class OrderAllocationService {
  constructor(private  apiService: ApiService) {
  }

  getPendingAllocationOrders(pageNumber: number, pageSize: number, warehouseId: number, channelType: string,
                             channelId: number,isReturn:boolean ,countryCode: string, orderMergeType: string, ssId: number,
                             timeSearchType: string, timeValueType: string, timeStart: string, timeEnd: string,
                             searchType: string, searchText: string,selectChannelIds: string)
  : Observable<ApiResponseBaseModel<ApiPageList<PendingGroupAllocationOrderListModel>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();

    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('isReturn', isReturn && isReturn.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('orderMergeType', orderMergeType);
    searchParams.set('ssId', ssId && ssId.toString());
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('channelIdString', selectChannelIds);


    return this.apiService.get(EndPointsConfig.EndPoints.Orders_Pending_Allocation_Order_List, searchParams);
  }

  generatePackages(warehouseId: number, channelType: string,
                   channelId: number,isReturn:boolean , countryCode: string, orderMergeType: string, ssId: number,
                   timeSearchType: string, timeValueType: string, timeStart: string, timeEnd: string,
                   searchType: string, searchText: string, orderIds: number[],
                   selectPackageCombineType: string)
                :Observable<ApiResponseBaseModel<BatchGeneratePackageResultModel>> {

    const searchParams = new URLSearchParams();

    searchParams.set('warehouseId', warehouseId.toString());
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('isReturn', isReturn && isReturn.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('orderMergeType', orderMergeType);
    searchParams.set('ssId', ssId && ssId.toString());
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('searchText', searchText);
    searchParams.set('packageCombineType', selectPackageCombineType);


    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Pending_Allocation_Order_GeneratePackages
                                , orderIds, searchParams);
  }

  generatePackage(orderId: number,warehouseId: number ): Observable<ApiResponseBaseModel<BatchGeneratePackageResultModel>> {
    const orderIds = [orderId];
    const searchParams = new URLSearchParams();

    searchParams.set('warehouseId', warehouseId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Pending_Allocation_Order_GeneratePackages, orderIds,searchParams);
  }
}
