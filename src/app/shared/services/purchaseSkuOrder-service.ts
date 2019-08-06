import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {ApiPageList} from "../models/page-list.model";
import {SupplierLiteModel} from "../models/purchases/supplier-lite-model";
import {EndPointsConfig} from "../Config";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class PurchaseSkuOrderService {
  constructor(private apiService: ApiService) {

  }

  getPageList(wareId:string, selectPurchaseUserId:string,selectPurchaseSkuOrderStatus: string, selectRemark: string,
               selectPurchaseUrl: string, selectHot: string, searchText: string,
               timeValueType: string, timeStart:string,timeEnd: string,
     pageNumber: number, pageSize: number)
    : Observable<ApiResponseBaseModel<ApiPageList<any>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('wareHouseId',wareId)
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());

    searchParams.set('selectPurchaseUserId', selectPurchaseUserId);
    searchParams.set('searchText', searchText);
    searchParams.set('purchaseSkuOrderStatus', selectPurchaseSkuOrderStatus);
    searchParams.set('isRemark', selectRemark);
    searchParams.set('isPurchaseUrl', selectPurchaseUrl);
    searchParams.set('isHot', selectHot);
    searchParams.set('timeValueType', timeValueType);
    searchParams.set('timeStart', timeStart);
    searchParams.set('timeEnd', timeEnd);
    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseSkuOrder_Page_List, searchParams);
  }

  PurchaseSkuOtherOrderList(wareHouseId:any,purchaseSkuOrderStatus:any,selectPurchaseUserId:any,isRemark:any,isPurchaseUrl:any,isHot:any,timeValueType:any,timeStart:any,timeEnd:any,searchText:any,pagenumber:any,pageSize:any,selectOtherPurchaseAccountId:any=null): Observable<ApiResponseBaseModel<any>> {
    let pageIndex = pagenumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('wareHouseId',wareHouseId);
    searchParams.set('purchaseSkuOrderStatus',purchaseSkuOrderStatus);
    searchParams.set('selectPurchaseUserId',selectPurchaseUserId);
    searchParams.set('selectOtherPurchaseAccountId',selectOtherPurchaseAccountId);
    searchParams.set('isRemark',isRemark);
    searchParams.set('isPurchaseUrl',isPurchaseUrl);
    searchParams.set('isHot',isHot);
    searchParams.set('timeValueType',timeValueType);
    searchParams.set('timeStart',timeStart);
    searchParams.set('timeEnd',timeEnd);
    searchParams.set('searchText',searchText);
    searchParams.set('pageIndex',pageIndex.toString());
    searchParams.set('pageSize',pageSize);
    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseSkuOrder_PurchaseSkuOtherOrderList,searchParams);
  }


  setActualNumber(id: number,num:number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id', id.toString());
    searchParams.set('number', num.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.PurchaseSkuOrder_Set_ActualNumber, null,searchParams);
  }

  overLookOrder(id: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id', id.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.PurchaseSkuOrder_Set_OverLookOrder, null,searchParams);
  }
  create1688Order(data: any): Observable<ApiResponseBaseModel<any>> {

    return this.apiService.post(EndPointsConfig.EndPoints.PurchaseSkuOrder_Create_1688Order, data);
  }

  getPurchaseHistoryList(
    supplierId: number, skuId: number,
    selectPurchaseUserId:string,selectEliminationPurchaseOrderUesrId:string)
  : Observable<ApiResponseBaseModel<any>> {

    const searchParams = new URLSearchParams();

    searchParams.set('supplierId', supplierId.toString());
    searchParams.set('skuId', skuId.toString());
    searchParams.set('selectPurchaseUserId', selectPurchaseUserId);
    searchParams.set('selectEliminationPurchaseOrderUesrId', selectEliminationPurchaseOrderUesrId);

    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseSkuOrder_Get_PurchaseHistoryList, searchParams);
  }

  GetPurchaseSkuOrderDetail(purchasePlanId:number,skuId:number,
               pageNumber: number, pageSize: number)
  : Observable<ApiResponseBaseModel<ApiPageList<any>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());

    searchParams.set('purchasePlanId', purchasePlanId.toString());
    searchParams.set('skuId', skuId.toString());


    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseSkuOrder_Get_PurchaseSkuOrderDetail, searchParams);
  }

  GetAccountList(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchaseAccount_GetAccountList);
  }

  PurchaseSkuSave(param:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchaseSkuOrder_PurchaseSkuSave,param);
  }
  GetOtherPendPurchaseOrder(purchaseSkuOrderId:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('purchaseSkuOrderId',purchaseSkuOrderId);
    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseSkuOrder_GetOtherPendPurchaseOrder,searchParams);
  }
  createOtherOrder(param:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchaseSkuOrder_CreateOtherOrder,param);
  }
}
