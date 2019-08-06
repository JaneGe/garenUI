import {Injectable} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {Observable} from "rxjs/Observable";
import {EndPointsConfig} from "../../../shared/Config";
import {ApiResponseBaseModel} from "../../../shared/models/api.response.basemodel";
import {URLSearchParams} from "@angular/http"
import {OrderRulesAddModel} from "../../../shared/models/orderrules/orderrules.model";
import {CountryItemModel} from "../../../shared/models/commons/country-item-model";

@Injectable()
export class LogisticsRulesService{

  constructor(private apiService: ApiService){
  }
  GetLogisticsRules( ruleStatus: number): Observable<ApiResponseBaseModel<any[]>>{
    const searchParams = new URLSearchParams();
    searchParams.set('ruleStatus', ruleStatus.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.LogisticsRules_RuleList, searchParams);
  }
  GetWareHouseIdByRuleType(): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    return this.apiService.get(EndPointsConfig.EndPoints.Logistics_WareHouseIdByRuleType, searchParams);
  }

  UpdateRuleLogPriority( orderPriority: number,orderRuleId:number): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    searchParams.set('OrderPriority', orderPriority.toString());
    searchParams.set('OrderRuleId', orderRuleId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.ShipUpdateRulePriority, searchParams);
  }
  AddLogisticsRules(orderrulesaddInfo: OrderRulesAddModel,IsModify :boolean, Id:number): Observable<ApiResponseBaseModel<any>> {
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
      WeightRange:{Min:null,Max:null},
      AllOrder:orderrulesaddInfo.allorder,
      WarehouseId :orderrulesaddInfo.warehouseId,
      shippingServiceId:orderrulesaddInfo.shippingServiceId,
      LimitingLogistics:orderrulesaddInfo.limitinglogistics,
      LimitingAccount:[],
      LimitingChannelType: orderrulesaddInfo.limitingChannelType,
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
    if(orderrulesaddInfo.weightrange!=null){
      data.WeightRange.Max=orderrulesaddInfo.weightrange.max;
      data.WeightRange.Min=orderrulesaddInfo.weightrange.min;
    }
    if(orderrulesaddInfo.limitingaccount!=null) {
      for(let i=0;i<orderrulesaddInfo.limitingaccount.length;i++){
        let _tempData = {ChannelId:orderrulesaddInfo.limitingaccount[i].id,ChannelName:orderrulesaddInfo.limitingaccount[i].name};
        data.LimitingAccount.push(_tempData);
      }
    }
    return this.apiService.post(EndPointsConfig.EndPoints.LogicsticsRulesAdd, data);
  }
  GetSkuListBySearch(searchText : string): Observable<ApiResponseBaseModel<any[]>>{
    const searchParams = new URLSearchParams();
    return this.apiService.get(EndPointsConfig.EndPoints.Sku_GetSkuListBySearch, searchParams);
  }
  GetLogisticsRulesItems(ruleId :number): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    searchParams.set('ruleId', ruleId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.OrderRulesItemRule_List, searchParams);
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
  ChangeOrderProtityByRuleId( ruleId: number, orderPriority:number): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    searchParams.set('ruleId', ruleId.toString());
    searchParams.set('orderPriority', orderPriority.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.OrderRulesChangeOrderProtityByRuleId, searchParams);
  }
  LogisticsRulesData=[];
}
