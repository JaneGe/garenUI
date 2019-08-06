import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {ApiPageList} from "../models/page-list.model";
import {SupplierLiteModel} from "../models/purchases/supplier-lite-model";
import {EndPointsConfig} from "../Config";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class SupplierService {
  constructor(private apiService: ApiService) {

  }

  getPageList(isActive: string, searchText: string, searchType: string, pageNumber: number, pageSize: number)
    : Observable<ApiResponseBaseModel<ApiPageList<SupplierLiteModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());

    searchParams.set('isActive', isActive);
    searchParams.set('searchText', searchText);
    searchParams.set('searchType', searchType);

    return this.apiService.get(EndPointsConfig.EndPoints.Supplier_List_Page, searchParams);
  }

  saveSupplierInfo(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Supplier_Add, data);
  }

  supplierTurnOn(
                data:number[])
  : Observable<ApiResponseBaseModel<any>> {

    let postData: number[] = null;
    if(data != null && data.length > 0){
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.Supplier_Enable, postData);
  }

  supplierTurnDead(
    data:number[])
  : Observable<ApiResponseBaseModel<any>> {

    let postData: number[] = null;
    if(data != null && data.length > 0){
      postData = data;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.Supplier_Disable, postData);
  }

}
