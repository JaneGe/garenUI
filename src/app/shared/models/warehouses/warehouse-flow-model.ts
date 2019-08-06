import {PageInfoModel} from "./warehouse-storeage-model";

export class WarehouseFlowModel {
  wareName: string;
  operateKind: number;
  searchType: number;
  searchText:string;
  timeSearch:number;
  beginTime:any;
  endTime:any;
  pageIndex:number;
  pageSize:number;
  skuId:number;
}
export class PageWarehouseFlowModel {
  Items: Array<any>;
  PageInfo: PageInfoModel;
}


