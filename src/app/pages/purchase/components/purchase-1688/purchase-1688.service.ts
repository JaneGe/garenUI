import { ApiService } from "../../../../shared/services/api.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApiResponseBaseModel } from "../../../../shared/models/api.response.basemodel";
import { EndPointsConfig } from "../../../../shared/Config";
import { URLSearchParams } from "@angular/http";
import {
  OtherPlatformOrderModel,
  PlatformOrderDetailSearchModel,
  PlatformOrderModel,
  PlatformSearchOrderModel, PlatformSearchOtherOrderModel
} from "../../../../shared/models/purchases/purchase-order1688-model";

@Injectable()
export class PurchaseOrder1688Service {
  constructor(public apiService: ApiService) {

  }

  GetAliAccounts(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Ali1688Accounts_List);
  }
  GetUserListQuery(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_Order_GetUserListQuery);
  }
  GetStorageData(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseSkuOrder_Get_WarehouseForPurchaseSkuOrder);
  }
  PlatformOrderQuery(searchParam: PlatformOrderModel): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_Order_PlatformOrderQuery, searchParam);
  }
  PlatformOrderSearchQuery(searchParam: PlatformSearchOrderModel): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_Order_PlatformOrderSearchQuery,searchParam);
  }

  PlatformOtherOrderQuery(searchParam: OtherPlatformOrderModel): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatformOrder_OtherPlatformOrderQuery, searchParam);
  }
  PlatformOtherOrderSearchQuery(searchParam: PlatformSearchOtherOrderModel): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatformOrder_PlatformOtherOrderSearchQuery,searchParam);
  }

  GetPlatformOrderDetailQuery(searchParam: PlatformOrderDetailSearchModel): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_Order_GetPlatformOrderDetailQuery, searchParam);
  }
  GetPlatformOrderSearchQuery(orderId: PlatformOrderDetailSearchModel): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_Order_GetPlatformOrderSearchQuery, orderId);
  }
  GetPurchaseAccountsQuery(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchaseSkuOrder_GetPurchaseAccountsQuery);
  }

  CancelOtherOrder(platomformOrderId: string,note:string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = {
      Id:platomformOrderId,
      Note:note
    };
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatformOrder_CancelOtherOrder, searchParams);
  }

  ChangeDisCountPrice(price:any,itemId:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('price', price);
    searchParams.set('itemId', itemId);
    return this.apiService.get(EndPointsConfig.EndPoints.PurchaseSkuOrder_Get_ChangeDisCountPrice,searchParams);
  }
  AddPlatformLogistics(purchaseOrderId: number, wayBillNumber: string,logisticsCompanyName:string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('purchaseOrderId', purchaseOrderId.toString());
    searchParams.set('wayBillNumber', wayBillNumber.toString());
    searchParams.set('logisticsCompanyName', logisticsCompanyName.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.PurchasePlatform_Order_AddPlatformLogistics, searchParams);
  }
  UpdatePlatformLogistics(purchaseOrderId: number, wayBillNumber: string, logisticsId: number,logisticsCompanyName:string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('purchaseOrderId', purchaseOrderId.toString());
    searchParams.set('wayBillNumber', wayBillNumber.toString());
    searchParams.set('logisticsCompanyName', logisticsCompanyName.toString());
    searchParams.set('logisticsId', logisticsId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.PurchasePlatform_Order_UpdatePlatformLogistics, searchParams);
  }
  sync1688Order(platomformOrderId: string):  Observable<ApiResponseBaseModel<any>> {
    //PurchaseOrder1688Service
    const searchParams = new URLSearchParams();
    searchParams.set('platomformOrderId', platomformOrderId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_Order_Sync, null, searchParams);
  }
  RefuseOrder(platomformOrderId: string,note:string):  Observable<ApiResponseBaseModel<any>> {
    const searchParams = {
      Id:platomformOrderId,
      Note:note
    };
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_Order_Refuse, searchParams);
  }
  ConfirmPayForOrder(platomformOrderId:string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('purchaseOrderId', platomformOrderId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.PurchasePlatform_ConfirmPayForOrder, searchParams);
  }

  ConfirmPriceForOrder(platomformOrderId:string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('purchaseOrderId', platomformOrderId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.PurchasePlatform_ConfirmPriceForOrder, searchParams);
  }

  ConfirmPayForOtherOrder(platomformOrderId:string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('purchaseOrderId', platomformOrderId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.PurchasePlatformOrder_ConfirmPayForOtherOrder, searchParams);
  }

  DeleteTrackingNumber(id: string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('platformLogisticId', id);
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_DeletePlatformLogistics, null, searchParams);
  }

  PlatformOrderProcessingComplete(id: string,content:string): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id', id);
    searchParams.set('content', content);
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_PlatformOrderProcessingComplete, null,  searchParams);
  }


  // GetPlatformOrderSkuArrivalGoodsDetailQuery(platomformOrderId:number,skuId:number):  Observable<ApiResponseBaseModel<any>> {
  //   const searchParams = new URLSearchParams();
  //   searchParams.set('purchasePlatformOrdersId', platomformOrderId.toString());
  //   searchParams.set('skuId', skuId.toString());
  //   return this.apiService.get(EndPointsConfig.EndPoints.PurchasePlatform_GetPlatformOrderSkuArrivalGoodsDetailQuery, searchParams);
  // }
  GetPlatformOrderSkuArrivalGoodsDetailQuery(purchasePlatformOrderItemsId:number):  Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('purchasePlatformOrderItemsId',purchasePlatformOrderItemsId && purchasePlatformOrderItemsId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.PurchasePlatform_GetPlatformOrderSkuArrivalGoodsDetailQuery, searchParams);
  }

  batchSync1688Order( data: number[]):  Observable<ApiResponseBaseModel<any>> {
    let postData: number[] = null;
    if (data != null && data.length > 0) {
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_Order_BatchSync, postData);
  }

  batchAllSync1688Order( searchParam: PlatformOrderModel):  Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_Order_BatchAllSync, searchParam);
  }

  updateBuyCount(id: number,itemId:number,newBuyCount:number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('purchaseOrderId', id && id.toString());
    searchParams.set('purchaseOrderItemId', itemId && itemId.toString());
    searchParams.set('newBuyCount', newBuyCount && newBuyCount.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_UpdateBuyCount, null,  searchParams);
  }
  manualFinishPurchaseOrder(platomformOrderId: string):  Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('orderId', platomformOrderId);
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_Order_ManualFinished, null, searchParams);
  }
  MergePurchaseForSameOtherNumber(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchaseSkuOrder_MergePurchaseForSameOtherNumber);
  }
}
