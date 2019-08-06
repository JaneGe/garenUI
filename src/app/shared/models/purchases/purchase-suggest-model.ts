import {PageInfoModel} from "../page-list.model";

export class PurchaseSuggestModel {
  Id:number;
  Status:number;
  Hot:number;
  SkuAttr:number[];
  supplierId:number;
  SearchText:string;
  PageSize:number;
  PageIndex:number;
}
export class PagePurchaseSuggestModel {
  Items: Array<any>;
  PageInfo: PageInfoModel;
}


