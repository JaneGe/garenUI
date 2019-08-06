import {Injectable} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {Observable} from "rxjs/Observable";
import {EndPointsConfig} from "../../../shared/Config";
import {ApiResponseBaseModel} from "../../../shared/models/api.response.basemodel";
import {ReceiveRecordModel} from "../../../shared/models/warehouses/warehouse-receiverecord-model";

@Injectable()
export class ReceiveService {
  constructor(public apiService: ApiService) {

  }
  GetStorageData(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }
  GetReceiveRecordQuery(param:ReceiveRecordModel): Observable<ApiResponseBaseModel<any>> {
    const data = {
      WareName:param.wareName,
      SearchText:param.searchText,
      SearchToggle:param.SearchToggle,
      SearchType:param.SearchType,
      OrderTimeSpan:param.OrderTimeSpan,
      BeginTime:param.BeginTime,
      EndTime:param.EndTime,
      PageIndex:param.pageIndex,
      PageSize:param.pageSize
    };
    return this.apiService.post(EndPointsConfig.EndPoints.GetReceiveRecordQuery,data);
  }
  AddReceiveRecord(param:any): Observable<ApiResponseBaseModel<any>>{
    return this.apiService.post(EndPointsConfig.EndPoints.AddReceiveRecord,param);
  }

  record = [];
}
