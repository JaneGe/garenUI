export class WarehouseSearchModel {
  wareName: string;
  locationType: number;
  lockedType: number;
  searchType: number;
  searchText:string;
  pageIndex:number;
  pageSize:number;
  sortType:number;
  sortOrder:boolean;
}
export class PageWarehouseModel {
  Items: Array<any>;
  PageInfo: PageInfoModel;
}

export class PageInfoModel {
  PageCount: number;
  PageIndex: number;
  PageSize: number;
  TotalCount: number;
}

