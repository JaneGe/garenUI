
export class EmailQueryParam {
  operationType: number;
  timeSpan: number;
  mailSearchType?: number;
  businessType?: number;
  searchText: string;
  beginTime:any;
  endTime:any;
  noReplyUserId?:any;
  replyUserId?:any;
  pageIndex:number;
  pageSize: number;
}
