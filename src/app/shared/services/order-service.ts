import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {ApiPageList} from "../models/page-list.model";
import {AllOrderListModel} from "../models/orders/all-order-list-model";
import {EndPointsConfig} from "../Config";
import {URLSearchParams} from "@angular/http"
import {OrderDetailModel} from "../models/orders/order-detail-model";


@Injectable()
export class OrderService {
  constructor(private  apiService: ApiService) {

  }


  searchOrderList(pageNumber: number, pageSize: number, iffeedBack:string, hasNote:string, channelType: string,
                  channelId: number, countryCode:string,orderSearchStatus: string,
                  timeSearchType: string,timeValueType: string,
                  timeStart:string,timeEnd: string, searchType: string, searchText: string,
                  orderbatchSearchType:string,orderbatchSearchText:string, selectChannelIds: string)
  : Observable<ApiResponseBaseModel<ApiPageList<AllOrderListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('channelType', channelType);
    searchParams.set('channelId',channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('isCompleteSales', iffeedBack && iffeedBack.toString());
    searchParams.set('hasNote', hasNote&&hasNote.toString());
    searchParams.set('orderSearchStatus', orderSearchStatus);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderbatchSearchType', orderbatchSearchType);
    // searchParams.set('orderbatchSearchText', orderbatchSearchText);
    searchParams.set('channelIdString', selectChannelIds);


    let bodyData = { orderbatchSearchText: orderbatchSearchText };
    return this.apiService.post(EndPointsConfig.EndPoints.Orders_All_List,bodyData, searchParams);
  }


  getOrderDetail(orderId: number): Observable<ApiResponseBaseModel<OrderDetailModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Orders_Order_Detail, searchParams);
  }

  getOrderEmailDetail(orderId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Orders_Order_GetOrderEmailDetail, searchParams);
  }
  sendEmailByOrder(email: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Email_SendEmailByOrder, email);
  }

  saveBuyerShippingAddress(orderId: number, data: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Order_Detail_Save_Address,
       data, searchParams);
  }

  saveOrderLines(orderId: number, data: any): Observable<ApiResponseBaseModel<any>>  {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Order_Detail_Save_OrderLines,data, searchParams);
  }

  saveOrderLineDeclaration(orderId: number, pData: any): Observable<ApiResponseBaseModel<any>>  {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Order_Detail_Save_Declaration, pData, searchParams);
  }

  voidOrder(orderId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Void_Order, null, searchParams)
  }
  resetOrder(orderId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Reset_Order, null, searchParams)
  }
  activeOrder(orderId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Active_Order, null, searchParams)
  }

  addOrderNote(orderId: number, data: any ) : Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Order_Detail_Add_Note, data, searchParams)
  }

  saveOrderAllocateInfo(orderId: number, allocateData: any): Observable<ApiResponseBaseModel<any>>  {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Order_Detail_Save_AllocateInfo, allocateData, searchParams)
  }

  lockOrder(orderId: number): Observable<ApiResponseBaseModel<any>>  {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Lock_Order,null, searchParams)
  }

  unlockOrder(orderId: number): Observable<ApiResponseBaseModel<any>>  {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Unlock_Order,null, searchParams)
  }

  fetchTrackingNumber(orderId: number) {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Order_Detail_Fetch_TrackingNumber,null, searchParams)
  }


  orderReissue(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Order_Detail_OrderReissue, data);
  }

  GetOrderPostBackList(pageNumber: number, pageSize: number, selectedCompleteSalesStatus:string, channelType: string, channelId: number,
                  countryCode:string,timeSearchType: string,timeValueType: string,
                  timeStart:string,timeEnd: string, searchType: string, searchText: string,
                  orderbatchSearchType:string,orderbatchSearchText:string)
  : Observable<ApiResponseBaseModel<ApiPageList<AllOrderListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('channelType', channelType);
    searchParams.set('channelId',channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('completeSalesStatus', selectedCompleteSalesStatus);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderbatchSearchType', orderbatchSearchType);
    searchParams.set('orderbatchSearchText', orderbatchSearchText);

    return this.apiService.get(EndPointsConfig.EndPoints.Orders_All_GetOrderPostBackList, searchParams);
  }

  GetOrderPostBackInfo(orderId: number)
  : Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Orders_All_GetOrderPostBackInfo, searchParams);
  }

  OrderPostBack(orderId: number,trackingNumber:string,carrierCode:string,carrireName:string): Observable<ApiResponseBaseModel<any>>  {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());
    searchParams.set('trackingNumber', trackingNumber);
    searchParams.set('carrierCode', carrierCode);
    searchParams.set('carrireName', carrireName);

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_OrderPostBack,null, searchParams);
  }

  OrderNoPostBack( selectedCompleteSalesStatus:string, channelType: string, channelId: number,
                       countryCode:string,timeSearchType: string,timeValueType: string,
                       timeStart:string,timeEnd: string, searchType: string, searchText: string,
                       orderbatchSearchType:string,orderbatchSearchText:string,
                       data: number[])
  :Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    searchParams.set('channelId',channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('completeSalesStatus', selectedCompleteSalesStatus);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderbatchSearchType', orderbatchSearchType);
    searchParams.set('orderbatchSearchText', orderbatchSearchText);

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.Orders_All_OrderNoPostBack, postData,searchParams);
  }

  GetOrderAdvancePostBackList(pageNumber: number, pageSize: number, selectedCompleteSalesStatus:string, channelType: string, channelId: number,
                       countryCode:string,timeSearchType: string,timeValueType: string,
                       timeStart:string,timeEnd: string, searchType: string, searchText: string,
                       orderbatchSearchType:string,orderbatchSearchText:string)
  : Observable<ApiResponseBaseModel<ApiPageList<AllOrderListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('channelType', channelType);
    searchParams.set('channelId',channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('completeSalesStatusAdvancePostBack', selectedCompleteSalesStatus);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderbatchSearchType', orderbatchSearchType);
    searchParams.set('orderbatchSearchText', orderbatchSearchText);

    return this.apiService.get(EndPointsConfig.EndPoints.Orders_All_GetOrderAdvancePostBackList, searchParams);
  }

  OrderAdvancePostBack(  channelType: string, channelId: number,
                   countryCode:string,timeSearchType: string,timeValueType: string,
                   timeStart:string,timeEnd: string, searchType: string, searchText: string,
                   orderbatchSearchType:string,orderbatchSearchText:string,
                   data: number[])
  :Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    searchParams.set('channelId',channelId && channelId.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('timeSearchType', timeSearchType);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('orderbatchSearchType', orderbatchSearchType);
    searchParams.set('orderbatchSearchText', orderbatchSearchText);

    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.Orders_All_OrderAdvancePostBack, postData,searchParams);
  }

  createManualOrders( date:any): Observable<ApiResponseBaseModel<any>> {

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Order_CreateManualOrders, date);
  }
  orderDefuseQuery(param:any){
    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Order_OrderDefuseQuery, param);
  }

  OrderDefuse(param:any,orderId:any){
    // const searchParams = new URLSearchParams();
    // searchParams.set('param',param);
    // searchParams.set('orderId',orderId);
    const  searchParams ={
      Param:param,
      OrderId:orderId
    };

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Order_OrderDefuse,searchParams);
  }
  OrderCombine(param:any,orderId:any,warehouseId:number,logisticsId:number){
    const  searchParams ={
      CombineOrderIds:param,
      OrderId:orderId,
      WarehouseId:warehouseId,
      AllocatedShippingServiceId:logisticsId
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Orders_Order_OrderCombine,searchParams);
  }

  orderCombineQuery(orderId:any){
    const searchParams = new URLSearchParams();
    searchParams.set('orderId',orderId);
    return this.apiService.get(EndPointsConfig.EndPoints.Orders_OrderCombineQuery, searchParams);
  }
  GetStorageData(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }
  GetWarehouseShippingQuery(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Logicstics_GetWarehouseShippingQuery);
  }
  getOrderLogActionQuery(orderId:any){
    const searchParams = new URLSearchParams();
    searchParams.set('orderId',orderId);
    return this.apiService.get(EndPointsConfig.EndPoints.Orders_Order_GetOrderLogActionQuery, searchParams);
  }
  ChangeOrderPrority(orderId:any,priority:any){
    const searchParams = new URLSearchParams();
    searchParams.set('orderId',orderId);
    searchParams.set('priority',priority);
    return this.apiService.get(EndPointsConfig.EndPoints.Orders_Order_ChangeOrderPrority, searchParams);
  }

  orderBackComesBack(orderId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', orderId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Orders_BackComesBack_Order, null, searchParams)
  }
}
