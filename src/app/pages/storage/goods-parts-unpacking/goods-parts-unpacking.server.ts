import {Injectable} from "@angular/core";
import {ApiService} from "../../../shared/services/api.service";
import {EndPointsConfig} from "../../../shared/Config";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../../../shared/models/api.response.basemodel";


@Injectable()
export class PackageUnpackingService {

  constructor(private apiService: ApiService) {
  }

  CombineUnpackRecorderQuery(param:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_CombineUnpackRecorderQuery,param);
  }
  //
  CombineUnpackInStore(param:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Warehouse_CombineUnpackInStore,param);
  }
}
