import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiPageList} from "../models/page-list.model";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http"
import {PackageListModel} from "../models/Package/package-list-model";
import {PackageDetailModel} from "../models/Package/package-detail-model";
import {environment} from "../../../environments/environment";


@Injectable()
export class ShippingTrackService {
  constructor(private apiService: ApiService) {

  }

  getPageList(selectTrackingOrderStatus: string, shippingServiceId: number,selectCountryCode: string,
              timeValueType: string, timeStart: string, timeEnd: string,
              batchSearchType: string, batchSearchText: string,
              searchText: string, searchType: string, pageNumber: number, pageSize: number,selectedWarehouseId:number,channelType:string,selectChannelIds: string): Observable<ApiResponseBaseModel<ApiPageList<any>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('status', selectTrackingOrderStatus);
    searchParams.set('shippingServiceId', shippingServiceId && shippingServiceId.toString());
    searchParams.set('Country', selectCountryCode);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('trackingBatchSearchType', batchSearchType);
    searchParams.set('batchsearchText', batchSearchText);
    searchParams.set('selectedWarehouseId',  selectedWarehouseId && selectedWarehouseId.toString());
    searchParams.set('channelType', channelType);
    searchParams.set('channelIdString', selectChannelIds);

    searchParams.set('searchType', searchType);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }

    return this.apiService.get(EndPointsConfig.EndPoints.Shipping_Track_PageList, searchParams);
  }

  getOrderTrackingEvents(trackingOrderId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('trackingOrderId', trackingOrderId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Shipping_TrackEvents_List, searchParams);
  }

  getTrackingOrderCountByStatus(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Shipping_GetTrackingOrderCountByStatus);
  }

}
