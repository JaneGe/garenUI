import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {ApiPageList} from "../models/page-list.model";
import {AllOrderListModel} from "../models/orders/all-order-list-model";
import {EndPointsConfig} from "../Config";
import {URLSearchParams} from "@angular/http"
import {OrderDetailModel} from "../models/orders/order-detail-model";
import {AllOrderExceptionListModel} from "../models/orders/all-orderException-list-model";
import {PackageListModel} from "../models/Package/package-list-model";
import {NeedMergeOrderGroupListModel} from "../models/orders/need-merge-order-group-list-model";
import {IgnoreOrdersMergeResult} from "../models/orders/ignore-orders-merge-result";
import {EditCompleteSaleOrderInfoModel} from "../models/orders/edit-complete-sale-order-info-model";


@Injectable()
export class OrderExceptionService {
  constructor(private  apiService: ApiService) {

  }

  getAllOrderExceptionCount(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.get(EndPointsConfig.EndPoints.OrderException_Order_getAllOrderExceptionCount);
  }


  searchOrderExceptionList(
    orderException: string,
    orderCompleteSalesStatus: string,
    pageNumber: number,
    pageSize: number,
    warehouseId:any,
    channelType: string,
    channelId: number,
    countryCode: string,
    timeSearchType: string,
    timeValueType: string,
    timeStart: string,
    timeEnd: string,
    searchType: string,
    searchText: string,
    orderbatchSearchType: string,
    orderbatchSearchText: string,
    otherException: string,
    selectChannelIds: any[]):
  Observable<ApiResponseBaseModel<ApiPageList<AllOrderExceptionListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('channelType', channelType);
    searchParams.set('warehouseId', warehouseId);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderExceptionBatchSearchType', orderbatchSearchType);
    searchParams.set('orderExceptionBatchSearchText', orderbatchSearchText);
    searchParams.set('Exception', orderException);
    searchParams.set('CompleteSalesStatus', orderCompleteSalesStatus);
    searchParams.set('OtherException', otherException);
    if(selectChannelIds != null && selectChannelIds.length > 0){
      const channelIdString = selectChannelIds.join(',');
      searchParams.set('ChannelIdString', channelIdString);
    }

    return this.apiService.get(EndPointsConfig.EndPoints.OrderException_Search_PageList, searchParams);
  }

  orderApproved(
    orderException: string,
    channelType: string,
    channelId: number,
    countryCode: string,
    timeSearchType: string,
    timeValueType: string,
    timeStart: string,
    timeEnd: string,
    searchType: string,
    searchText: string,
    orderbatchSearchType: string,
    orderbatchSearchText: string,
    data: number[]): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderExceptionBatchSearchType', orderbatchSearchType);
    searchParams.set('orderExceptionBatchSearchText', orderbatchSearchText);
    searchParams.set('Exception', orderException);

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }

    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_Approved, postData, searchParams);
  }

  orderLowProfitApproved(
    orderException: string,
    channelType: string,
    channelId: number,
    countryCode: string,
    timeSearchType: string,
    timeValueType: string,
    timeStart: string,
    timeEnd: string,
    searchType: string,
    searchText: string,
    orderbatchSearchType: string,
    orderbatchSearchText: string,
    data: number[]): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderExceptionBatchSearchType', orderbatchSearchType);
    searchParams.set('orderExceptionBatchSearchText', orderbatchSearchText);
    searchParams.set('Exception', orderException);

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }

    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_LowProfit_Approved, postData, searchParams);
  }


  ResetOrder(orderException: string,
             channelType: string, channelId: number,
             countryCode: string, timeSearchType: string, timeValueType: string,
             timeStart: string, timeEnd: string, searchType: string, searchText: string,
             orderbatchSearchType: string, orderbatchSearchText: string,
             data: number[]): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderExceptionBatchSearchType', orderbatchSearchType);
    searchParams.set('orderExceptionBatchSearchText', orderbatchSearchText);
    searchParams.set('Exception', orderException);

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_ResetOrder, postData, searchParams);
  }

  VoidedOrder(orderException: string,
              channelType: string, channelId: number,
              countryCode: string, timeSearchType: string, timeValueType: string,
              timeStart: string, timeEnd: string, searchType: string, searchText: string,
              orderbatchSearchType: string, orderbatchSearchText: string,
              data: number[]): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderExceptionBatchSearchType', orderbatchSearchType);
    searchParams.set('orderExceptionBatchSearchText', orderbatchSearchText);
    searchParams.set('Exception', orderException);

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_VoidedOrder, postData, searchParams);
  }

  LockOrder(orderException: string,
            channelType: string, channelId: number,
            countryCode: string, timeSearchType: string, timeValueType: string,
            timeStart: string, timeEnd: string, searchType: string, searchText: string,
            orderbatchSearchType: string, orderbatchSearchText: string,
            data: number[]): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderExceptionBatchSearchType', orderbatchSearchType);
    searchParams.set('orderExceptionBatchSearchText', orderbatchSearchText);
    searchParams.set('Exception', orderException);

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_LockOrder, postData, searchParams);
  }

  ChangeShippingService(orderException: string,
                        channelType: string, channelId: number,
                        countryCode: string, timeSearchType: string, timeValueType: string,
                        timeStart: string, timeEnd: string, searchType: string, searchText: string,
                        orderbatchSearchType: string, orderbatchSearchText: string,
                        warehouseId: number, shippingServiceId: number, data: number[]): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderExceptionBatchSearchType', orderbatchSearchType);
    searchParams.set('orderExceptionBatchSearchText', orderbatchSearchText);
    searchParams.set('Exception', orderException);
    searchParams.set('warehouseId', warehouseId && warehouseId.toString());
    searchParams.set('shippingServiceId', shippingServiceId && shippingServiceId.toString());

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_ChangeShippingService, postData, searchParams);
  }

  needTruckNumber(selectedWarehouseId: number,
                  shippingServiceId: number, trackNumberTypes: string,orderNeedTimeType:string,
                  timeValueType: string, timeStart: string, timeEnd: string,
                  searchText: string, searchType: string,selectCountry:any,
                  selectedAccounts:any,selectedPlateformId:any,
                  pageNumber: number, pageSize: number)
  :Observable<ApiResponseBaseModel<ApiPageList<PackageListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('selectedWarehouseId', selectedWarehouseId && selectedWarehouseId.toString());
    searchParams.set('shippingServiceId', shippingServiceId && shippingServiceId.toString());
    searchParams.set('trackNumberTypes', trackNumberTypes);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('orderNeedTimeType', orderNeedTimeType);
    searchParams.set('selectedAccounts', selectedAccounts.join(','));
    searchParams.set('country', selectCountry);
    searchParams.set('channelType', selectedPlateformId);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);

    searchParams.set('searchType', searchType);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }

    return this.apiService.get(EndPointsConfig.EndPoints.OrderException_Order_needTrcukNumber, searchParams);
  }


  manualEntryTrackingNumber(selectedWarehouseId: number, packageNumber: string, truckNumber: string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('selectedWarehouseId', selectedWarehouseId && selectedWarehouseId.toString());
    searchParams.set('packageNumber', packageNumber);
    searchParams.set('trackingNumber', truckNumber);
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_manualEntryTrackingNumberr, null, searchParams);
  }

  NoComesBack(orderCompleteSalesStatus: string,
              channelType: string, channelId: number,
              countryCode: string, timeSearchType: string, timeValueType: string,
              timeStart: string, timeEnd: string, searchType: string, searchText: string,
              orderbatchSearchType: string, orderbatchSearchText: string,
              data: number[]): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderExceptionBatchSearchType', orderbatchSearchType);
    searchParams.set('orderExceptionBatchSearchText', orderbatchSearchText);
    searchParams.set('CompleteSalesStatus', orderCompleteSalesStatus);

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_NoComesBack, postData, searchParams);
  }

  AfreshBackComesBack(orderCompleteSalesStatus: string, orderException: string,
                      channelType: string, channelId: number,
                      countryCode: string, timeSearchType: string, timeValueType: string,
                      timeStart: string, timeEnd: string, searchType: string, searchText: string,
                      orderbatchSearchType: string, orderbatchSearchText: string,
                      data: number[]): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderExceptionBatchSearchType', orderbatchSearchType);
    searchParams.set('orderExceptionBatchSearchText', orderbatchSearchText);
    searchParams.set('CompleteSalesStatus', orderCompleteSalesStatus);
    searchParams.set('Exception', orderException);

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_Picking_Manual_AfreshBackComesBack, postData, searchParams);
  }

  getNeedMergeOrderList(pageNumber: number, pageSize: number,warehouseId:any ,channelType: string, channelId: number,
                        countryCode: string, timeSearchType: string, timeValueType: string,
                        timeStart: string, timeEnd: string, searchType: string, searchText: string,
                        orderbatchSearchType: string, orderbatchSearchText: string, selectedChannelIds: any[]):
  Observable<ApiResponseBaseModel<ApiPageList<NeedMergeOrderGroupListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('warehouseId', warehouseId);
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);

    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);

    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('BatchSearchType', orderbatchSearchType);
    searchParams.set('BatchSearchText', orderbatchSearchText);

    if (selectedChannelIds != null && selectedChannelIds.length > 0) {
      const channelIds = selectedChannelIds.join(',');
      searchParams.set('ChannelIdString', channelIds);
    }


    return this.apiService.get(EndPointsConfig.EndPoints.OrderException_Search_NeedMerge_PageList, searchParams);
  }

  ignoreOrdersMerge(data: any): Observable<ApiResponseBaseModel<IgnoreOrdersMergeResult>> {
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Ignore_Order_Merge, data);
  }

  confirmUpdateSiteTrackingNumber(orderId: number ) {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId && orderId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_ConfirmUpdateSiteTrackingNumber, null,searchParams);
  }

  ContinueShipments(orderException: string,warehouseId:number,
             channelType: string, channelId: number,
             countryCode: string, timeSearchType: string, timeValueType: string,
             timeStart: string, timeEnd: string, searchType: string, searchText: string,
             orderbatchSearchType: string, orderbatchSearchText: string,
             data: number[]): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('warehouseId', warehouseId && warehouseId.toString());
    searchParams.set('channelType', channelType);
    searchParams.set('channelId', channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderExceptionBatchSearchType', orderbatchSearchType);
    searchParams.set('orderExceptionBatchSearchText', orderbatchSearchText);
    searchParams.set('Exception', orderException);

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_ContinueShipmentsOrder, postData, searchParams);
  }

  ContinueShipmentById(orderId: number): Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId && orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_ContinueShipmentsOrderById,null, searchParams);
  }
  getCompleteSaleInfo(orderId: number): Observable<ApiResponseBaseModel<EditCompleteSaleOrderInfoModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId && orderId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.OrderException_Order_GetCompleteSaleOrderInfoById, searchParams);
  }
  doEditCompleteSaleInfo(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_Order_DoEditCompleteSale, data);
  }
  QueryForChannel(channelType:any): Observable<ApiResponseBaseModel<any[]>> {
    let searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    return this.apiService.get(EndPointsConfig.EndPoints.Orderstatistics_QueryForChannel, searchParams);
  }
  DoOpeartionForNeedTrackNum(operation:any,orderIds:any): Observable<ApiResponseBaseModel<any>> {
    const data = {
      operation:operation,
      orderIds:orderIds
    };
    return this.apiService.post(EndPointsConfig.EndPoints.OrderException_DoOpeartionForNeedTrackNum,data);
  }

}
