import {PageInfoModel} from "../page-list.model";

export class PackingTaskModel {
  wareHouseId: string;
  searchText:string;
  pageIndex:number;
  pageSize:number;
  status:number;
 // progress:number;
}
export class PagePackingTaskModel {
  Items: Array<any>;
  PageInfo: PageInfoModel;
}
