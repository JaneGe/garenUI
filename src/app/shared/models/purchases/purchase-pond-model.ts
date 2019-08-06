import {PageInfoModel} from "../page-list.model";

export class PurchasePondModel {
  WarehouseId:number;
  WarehouseName:string;
  PlanType: number;
  Status:number;
  IsSetCreateTime:boolean;
  TimeChoose:number;
  ConditionChoose:number;
  BeginTime:any;
  EndTime:any;
  SearchText:string;
  PageSize:number;
  PageIndex:number;
}

export class OrderPurchaseParam {
  PurchasePlanId:number;
  ConditionEnum:number;
  SearchText: string;
  PageIndex:number;
  PageSize:number;
  IsAllInstock: boolean
}

export class PageReceiveRecordModel {
  Items: Array<any>;
  PageInfo: PageInfoModel;
}


