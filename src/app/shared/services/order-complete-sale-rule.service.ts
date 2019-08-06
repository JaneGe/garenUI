import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {EndPointsConfig} from "../Config";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {URLSearchParams} from '@angular/http';
import {OrderCompleteSaleListModel} from "../models/orderrules/order-complete-sale-list-model";
import {OrderCompleteSaleRuleModel} from "../models/orderrules/order-complete-sale-rule-model";

@Injectable()
export class OrderCompleteSaleRuleService {
  constructor(public apiService: ApiService) {
  }
  getRuleList(channelType: string, isActive:string, warehouseId: string, searchKind: number, searchText: string)
  : Observable<ApiResponseBaseModel<OrderCompleteSaleListModel[]>> {
    let searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    if(searchText && searchText.length > 0){
      searchParams.set('searchText', searchText);
    }
    searchParams.set('searchType', searchKind.toString());
    searchParams.set('warehouseId', warehouseId);
    searchParams.set('isActive', isActive);
    return this.apiService.get(EndPointsConfig.EndPoints.OrderCompleteSaleRule_List, searchParams);
  }

  saveRule(ruleData: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.OrderCompleteSaleRule_Save, ruleData);
  }
  deleteRule(ruleId: number): Observable<ApiResponseBaseModel<any>> {
    let searchParams = new URLSearchParams();
    searchParams.set('ruleId', ruleId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.OrderCompleteSaleRule_Delete, null, searchParams);
  }
  getRuleDetail(ruleId: number): Observable<ApiResponseBaseModel<OrderCompleteSaleRuleModel>> {
    let searchParams = new URLSearchParams();
    searchParams.set('ruleId', ruleId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.OrderCompleteSaleRule_Detail, searchParams);
  }
  enableRule(ruleId: number): Observable<ApiResponseBaseModel<any>> {
    let searchParams = new URLSearchParams();
    searchParams.set('ruleId', ruleId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.OrderCompleteSaleRule_Enable, null, searchParams);
  }
  disableRule(ruleId: number): Observable<ApiResponseBaseModel<any>> {
    let searchParams = new URLSearchParams();
    searchParams.set('ruleId', ruleId.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.OrderCompleteSaleRule_Disable, null, searchParams);
  }

  GetMaxRulePriority(channelType:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('channelType',channelType);
    return this.apiService.get(EndPointsConfig.EndPoints.OrderCompleteSaleRule_GetMaxRulePriority,searchParams);
  }
  UpdateRulePriority(priority:any,orderRuleId:any,channelType:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('priority',priority);
    searchParams.set('orderRuleId',orderRuleId);
    searchParams.set('channelType',channelType);
    return this.apiService.get(EndPointsConfig.EndPoints.OrderCompleteSaleRule_UpdateRulePriority,searchParams);
  }
}
