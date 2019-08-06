import {PageInfoModel} from "../page-list.model";

export class PlatformOrderModel {
  Id:number;
  WarehouseId:number;
  AuditId:number;
  Account1688Id:number;
  IsHighSearch:boolean;
  IsSpecialSearch:boolean;
  OrderStatus:number;
  SpecialType:number;
  IsBargaining:number;
  TimeChoose:number;
  PayChoose:number;
  NoteChoose:number;
  SendGoodDay:string;
  UnSendGoodsDay:number;
  UnSendGoodDayUseSet?:string;
  SendNoLogistics:number;
  Unpack:number;
  IsDeal:number;
  UnpackNoDealDay:number;
  SkuStatus:number;
  UnpackStatus:number;
  ReceivepackageStatus:number;
  UnPackageExceptionType:any[];
  BeginTime:any;
  EndTime:any;
  PageIndex:number;
  PageSize:number;
}

export class PlatformSearchOrderModel {
  Id:number;
  WarehouseId:number;
  Account1688Id:number;
  AuditId:number;
  OrderType:number;
  SearchText:string;
  PageIndex:number;
  SubmitUserIds:any[];
  PageSize:number;
}

export class PlatformOrderDetailSearchModel {
  PlatformOrderId:number;
  PageIndex:number;
  PageSize:number;
}

export class OtherPlatformOrderModel {
  Id:number;
  WarehouseId:number;
  AuditId:number;
  AccountId:number;
  IsHighSearch:boolean;
  IsSpecialSearch:boolean;
  OrderStatus:number;
  SpecialType:number;
  IsBargaining:number;
  TimeChoose:number;
  PayChoose:number;
  NoteChoose:number;
  SendGoodDay:string;
  UnSendGoodsDay:number;
  UnSendGoodDayUseSet?:string;
  SendNoLogistics:number;
  Unpack:number;
  IsDeal:number;
  UnpackNoDealDay:number;
  SkuStatus:number;
  UnpackStatus:number;
  ReceivepackageStatus:number;
  UnPackageExceptionType:any[];
  BeginTime:any;
  EndTime:any;
  PageIndex:number;
  PageSize:number;
}

export class PlatformSearchOtherOrderModel {
  Id:number;
  WarehouseId:number;
  AccountId:number;
  AuditId:number;
  OrderType:number;
  SearchText:string;
  PageIndex:number;
  SubmitUserIds:any[];
  PageSize:number;
}


export class PagePlatformOrderModel {
  Items: Array<any>;
  PageInfo: PageInfoModel;
}


