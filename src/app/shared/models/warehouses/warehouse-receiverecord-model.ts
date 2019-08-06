import {PageInfoModel} from "./warehouse-storeage-model";

export class ReceiveRecordModel {
  wareId:number;
  wareName: string;
  searchText:string;
  SearchToggle:number;
  SearchType:number;
  OrderTimeSpan:number;
  BeginTime:any;
  EndTime:any;
  pageIndex:number;
  pageSize:number;
}
export class PageReceiveRecordModel {
  Items: Array<any>;
  PageInfo: PageInfoModel;
}


