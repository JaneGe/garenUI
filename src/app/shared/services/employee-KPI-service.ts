import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiPageList} from "../models/page-list.model";
import {ChooseSkuListModel} from "../models/products/ChooseSku-list-model";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http"


@Injectable()
export class EmployeeKPIService {
  constructor(private apiService: ApiService) {

  }

  saveEmployeeKPI(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.EmployeeKPISave, data);
  }

  deleteEmployeeKPI(id: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id', id.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.DeleteEmployeeKPI, null, searchParams);
  }

  getPageList(selectSearchYears,selectSearchMonths,selectSearchType: string, searchText: string,
              pageNumber: number, pageSize: number): Observable<ApiResponseBaseModel<ApiPageList<any>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('searchYearsType', selectSearchYears);
    searchParams.set('searchMonthsType', selectSearchMonths);
    searchParams.set('searchType', selectSearchType);
    searchParams.set('searchText', searchText);
    if (searchText != null && searchText != '') {
      searchParams.set('searchText', searchText);
    }
    return this.apiService.get(EndPointsConfig.EndPoints.GetEmployeeKPIList, searchParams);
  }

  getEmployeeKPIDetail(id: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id', id.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.Employee_KPI_Detail, searchParams);
  }

}
