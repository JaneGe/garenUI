import {Injectable} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {URLSearchParams} from "@angular/http";
import {ApiResponseBaseModel} from "../../../shared/models/api.response.basemodel";
import {EndPointsConfig} from "../../../shared/Config";
import {Observable} from "rxjs/Observable";
import {OrderRulesAddModel} from "../../../shared/models/orderrules/orderrules.model";
import {CountryItemModel} from "../../../shared/models/commons/country-item-model";

@Injectable()
export class StorageRulesService{
  constructor(private apiService: ApiService){
  }
  GetWarehouseRules( ruleStatus: number): Observable<ApiResponseBaseModel<any[]>>{
    const searchParams = new URLSearchParams();
    searchParams.set('ruleStatus', ruleStatus.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.WarehouseRules_RuleList, searchParams);
  }
  UpdateRuleWarehousePriority( orderPriority: number,orderRuleId:number): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    searchParams.set('OrderPriority', orderPriority.toString());
    searchParams.set('OrderRuleId', orderRuleId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.WarehouseUpdateRulePriority, searchParams);
  }
  AddWarehousesRules(orderrulesaddInfo: OrderRulesAddModel,IsModify :boolean, Id:number): Observable<ApiResponseBaseModel<any>> {
    const data = {
      Id:Id,
      IsModify:IsModify,
      Priority : orderrulesaddInfo.priority,
      Name: orderrulesaddInfo.name,
      HasRefund: orderrulesaddInfo.hasrefund,
      HasRetroactive: orderrulesaddInfo.hasretroactive,
      NotmatchPaypal:orderrulesaddInfo.notmatchPaypal,
      NoProvince:orderrulesaddInfo.noprovince,
      LimitingMoney:{Min:null,Max:null,Currency:''},
      LimitingCommodity:[],
      OutRangeCountry:null,
      LimitingCountry:null,
      AllOrder:orderrulesaddInfo.allorder,
      WarehouseId :orderrulesaddInfo.warehouseId,
      LimitingLogistics:orderrulesaddInfo.limitinglogistics,
      LimitingAccount:[],
      LimitingChannelType:orderrulesaddInfo.limitingChannelType,
      ProductAttrIn:orderrulesaddInfo.productAttrIn,
      ProductAttrOut:orderrulesaddInfo.productAttrOut,
    };
    if(orderrulesaddInfo.limitingmoney!=null){
      data.LimitingMoney.Min=orderrulesaddInfo.limitingmoney.min;
      data.LimitingMoney.Max=orderrulesaddInfo.limitingmoney.max;
      data.LimitingMoney.Currency=orderrulesaddInfo.limitingmoney.currency;
    }
    if(orderrulesaddInfo.limitingcommodity!=null){
      data.LimitingCommodity=orderrulesaddInfo.limitingcommodity;
    }
    if(orderrulesaddInfo.outrangecountry!=null){
      data.OutRangeCountry=orderrulesaddInfo.outrangecountry;
    }
    if(orderrulesaddInfo.limitingcountry!=null){
      data.LimitingCountry=orderrulesaddInfo.limitingcountry;
    }
    if(orderrulesaddInfo.limitingaccount!=null)
    {
      for(let i=0;i<orderrulesaddInfo.limitingaccount.length;i++){
        let _tempData={ChannelId:orderrulesaddInfo.limitingaccount[i].id,ChannelName:orderrulesaddInfo.limitingaccount[i].name};
        data.LimitingAccount.push(_tempData);
      }
    }
    return this.apiService.post(EndPointsConfig.EndPoints.WarehouseRulesAdd, data);
  }
  GetWareHouseRulesItems(ruleId :number): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    searchParams.set('ruleId', ruleId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.OrderRulesItemRule_List, searchParams);
  }
  GetSkuListBySearch(searchText : string): Observable<ApiResponseBaseModel<any[]>>{
    const searchParams = new URLSearchParams();
    return this.apiService.get(EndPointsConfig.EndPoints.Sku_GetSkuListBySearch, searchParams);
  }
  SetOrderRulesStatus(ruleId :number,status:boolean): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    searchParams.set('ruleId', ruleId.toString());
    searchParams.set('status', status.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.OrderRulesSetStatus, searchParams);
  }
  DeleteOrderRules(ruleId :number): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    searchParams.set('ruleId', ruleId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.OrderRulesDel, searchParams);
  }
  getAllCountries(): Observable<ApiResponseBaseModel<CountryItemModel[]>> {

    return this.apiService.get(EndPointsConfig.EndPoints.Common_Get_All_Countries)
  }
  storageRulesData=[];
}
