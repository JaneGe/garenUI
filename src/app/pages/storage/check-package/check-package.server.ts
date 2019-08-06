import {ApiService} from "../../../shared/services/api.service";
import {Injectable} from "@angular/core";
import {EndPointsConfig} from "../../../shared/Config";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../../../shared/models/api.response.basemodel";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class PackageCheckService {

  constructor(private apiService: ApiService) {
  }
  CalePackageBySearchCode(searchCode:string=''): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('SearchCode', searchCode.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_CalePackageBySearchCode,searchParams);
  }
  SearchPackageProductQuery(searchCode:string=''): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('SearchCode', searchCode.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_SearchPackageProductQuery,searchParams);
  }

}
