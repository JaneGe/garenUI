import {Observable} from "rxjs/Observable";

import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http"
import {OrderRulesAddModel, OrderRulesModel} from "../../../shared/models/orderrules/orderrules.model";
import {ApiService} from "../../../shared/services/api.service";
import {ApiResponseBaseModel} from "../../../shared/models/api.response.basemodel";
import {EndPointsConfig} from "../../../shared/Config";
import {CountryItemModel} from "../../../shared/models/commons/country-item-model";

@Injectable()
export class OrderRulesService{
  constructor(private apiService: ApiService){
  }
  GetOrderRules( ruleStatus: number): Observable<ApiResponseBaseModel<any[]>>{
    const searchParams = new URLSearchParams();
    searchParams.set('ruleStatus', ruleStatus.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.OrderRules_RulesList, searchParams);
  }
  UpdateRuleOrderPriority( orderPriority: number,orderRuleId:number): Observable<ApiResponseBaseModel<any>>{
    const searchParams = new URLSearchParams();
    searchParams.set('OrderPriority', orderPriority.toString());
    searchParams.set('OrderRuleId', orderRuleId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.OrderUpdateRulePriority, searchParams);
  }
  AddOrderRules(orderrulesaddInfo: OrderRulesAddModel,IsModify :boolean, Id:number): Observable<ApiResponseBaseModel<any>> {
    const data = {
      Id:Id,
      IsModify:IsModify,
      Priority : orderrulesaddInfo.priority,
      Name: orderrulesaddInfo.name,
      HasRefund: orderrulesaddInfo.hasrefund,
      HasRetroactive: orderrulesaddInfo.hasretroactive,
      NotmatchPaypal:orderrulesaddInfo.notmatchPaypal,
      NoProvince:orderrulesaddInfo.noprovince,
      AllOrder:orderrulesaddInfo.allorder,
      LimitingMoney:{Min:null,Max:null,Currency:''},
      LimitingCommodity:[],
      OutRangeCountry:null,
      LimitingCountry:null,
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
    return this.apiService.post(EndPointsConfig.EndPoints.OrderRulesAdd, data);
  }
  GerOrderRulesItems(ruleId :number): Observable<ApiResponseBaseModel<any>>{
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
  GetSkuListBySearch(searchText : string): Observable<ApiResponseBaseModel<any[]>>{
    const searchParams = new URLSearchParams();
    return this.apiService.get(EndPointsConfig.EndPoints.Sku_GetSkuListBySearch, searchParams);
  }
  getAllCountries(): Observable<ApiResponseBaseModel<CountryItemModel[]>> {

    return this.apiService.get(EndPointsConfig.EndPoints.Common_Get_All_Countries)
  }
  orderRulesData=[];

  /*
  orderRulesData=[
      {
      priority:1,
      id:1,
      name:'order1',
      status:'已启用',
      hasrefund:true,
      hasretroactive:true,
      notmatchPaypal:true,
      limitingmoney:{currency:'USD',min:'50',max:'100'},
      limitingcommodity:{name:'杯子'},
      limitingcountry:['Australia','US'],
      limitingaccount:{platform:'ebay',account:'123456@qq.com'},
      outrangecountry:['Africa','UK'],
      noprovince:true,
    },
    {
      priority:2,
      id:2,
      name:'order2',
      status:'已停用',
      hasrefund:true,
      notmatchPaypal:true,
      limitingmoney:{currency:'USD',min:'50',max:'100'},
      limitingaccount:{platform:'ebay',account:'123456@qq.com'},
      outrangecountry:['Africa','UK'],
      noprovince:true,
    },
    {
      priority:3,
      id:3,
      name:'order3',
      status:'已启用',
      hasrefund:true,
      hasretroactive:true,
      outrangecountry:['Africa','UK'],
      noprovince:true,
    },
    {
      priority:4,
      id:4,
      name:'order4',
      status:'已停用',
      hasrefund:true,
      hasretroactive:true,
      notmatchPaypal:true,
      limitingmoney:{currency:'USD',min:'50',max:'100'},
      limitingcommodity:{name:'杯子'},
    }
  ];
  */
}
