import {ApiService} from "../../../../shared/services/api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../../../../shared/models/api.response.basemodel";
import {EndPointsConfig} from "../../../../shared/Config";
import {OrderPurchaseParam, PurchasePondModel} from "../../../../shared/models/purchases/purchase-pond-model";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class PurchaseService {
  constructor(public apiService: ApiService) {

  }

  GetStorageData(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }

  PurchasePlanQuery(params: PurchasePondModel): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Purchase_PlanQuery, params);
  }

  OrderPurchasePlanQuery(params: OrderPurchaseParam): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Purchase_OrderPurchasePlanQuery, params);
  }

  generatePurchasePlan(warehouseId: number, planType: string): Observable<ApiResponseBaseModel<any>> {
    const search = new URLSearchParams();
    search.set('warehouseId', warehouseId.toString());
    search.set('purchasePlanType', planType);


    return this.apiService.post(EndPointsConfig.EndPoints.Purchase_Plan_Generate, null, search);
  }
  batchAddSkuParse(data: any):Observable<ApiResponseBaseModel<any>>{
    return this.apiService.post(EndPointsConfig.EndPoints.Purchase_Plan_BatchParseSku, data);
  }
  manualCreatePurchasePlan(data: any):Observable<ApiResponseBaseModel<any>>{
    return this.apiService.post(EndPointsConfig.EndPoints.Purchase_Plan_CreatePurchasePlan, data);
  }

  purchasePlanTypes = [{Id: 0, Name: '全部'}, {Id: 1, Name: '采购建议'}, {Id: 2, Name: '欠票'}, {Id:3, Name: '备货单'}];
  planStatuss = [{ Id: 20, Name: '全部' }, { Id: 0, Name: '已创建' }, { Id: 2, Name: '部分完成' }, { Id: 1, Name: '已完成' }];
  timeChoose = ["创建时间", "完成时间"];
  timeSpan = [{Id: 0, Name: '全部'}, {Id: 1, Name: '今天'}, {Id: 2, Name: '昨天'}, {Id: 3, Name: '7天以内'}, {
    Id: 4, Name: '30天以内' }, {Id: 5, Name: '自定义'}];
  conditionChoose = [{ Id: 0, Name: '采购编号' }, { Id: 1, Name: '订单号' }, { Id: 2, Name: 'SKU' }];
  // Data = [
  //   {id: 14, startTime: '2017/9/26 上午7:28:30', isUrgent: '欠票', state: '已完成', endTime: '2017/9/26 上午9:28:30'},
  //   {id: 15, startTime: '2017/9/26 上午7:28:30', isUrgent: '采购', state: '已完成', endTime: '2017/9/26 上午9:28:30'},
  //   {id: 16, startTime: '2017/9/26 上午7:28:30', isUrgent: '采购+欠票', state: '已完成', endTime: '2017/9/26 上午9:28:30'},
  //   {id: 16, startTime: '2017/9/26 上午7:28:30', isUrgent: '采购+欠票', state: '已完成', endTime: '2017/9/26 上午9:28:30'},
  //   {id: 16, startTime: '2017/9/26 上午7:28:30', isUrgent: '采购+欠票', state: '已完成', endTime: '2017/9/26 上午9:28:30'},
  //   {id: 16, startTime: '2017/9/26 上午7:28:30', isUrgent: '采购+欠票', state: '已完成', endTime: '2017/9/26 上午9:28:30'},
  //   {id: 16, startTime: '2017/9/26 上午7:28:30', isUrgent: '采购+欠票', state: '已完成', endTime: '2017/9/26 上午9:28:30'},
  //   {id: 16, startTime: '2017/9/26 上午7:28:30', isUrgent: '采购+欠票', state: '已完成', endTime: '2017/9/26 上午9:28:30'},
  //   {id: 16, startTime: '2017/9/26 上午7:28:30', isUrgent: '采购+欠票', state: '已完成', endTime: '2017/9/26 上午9:28:30'},
  //   {id: 16, startTime: '2017/9/26 上午7:28:30', isUrgent: '采购+欠票', state: '已完成', endTime: '2017/9/26 上午9:28:30'},
  //   {id: 16, startTime: '2017/9/26 上午7:28:30', isUrgent: '采购+欠票', state: '已完成', endTime: '2017/9/26 上午9:28:30'},
  // ];

}
