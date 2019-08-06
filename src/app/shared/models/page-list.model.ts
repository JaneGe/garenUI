export class ApiPageList<TItem>{
  pageInfo: PageInfoModel;
  items: TItem[]
}

export class PageInfoModel {
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}
