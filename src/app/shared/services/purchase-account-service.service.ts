import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {ApiPageList} from "../models/page-list.model";
import {EndPointsConfig} from "../Config";
import { URLSearchParams } from "@angular/http";

@Injectable()
export class PurchaseAccountServiceService {
  constructor(public apiService: ApiService) {
  }

  getPageList(purchasePlatformType: string, searchText: string, pageNumber: number, pageSize: number):
  Observable<ApiResponseBaseModel<ApiPageList<any>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }

    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('PlatformType', purchasePlatformType);
    searchParams.set('AccountName', searchText);

    return this.apiService.get(EndPointsConfig.EndPoints.Purchase_PurchaseAccount_Pagelist, searchParams);
  }

  addAccount(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Purchase_PurchaseAccount_AddAccount, data);
  }

  saveAccount(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Purchase_PurchaseAccount_EditAccount, data);
  }

  setAccountStatus(accountId: number, isActive: boolean): Observable<ApiResponseBaseModel<any>> {
    const data = <any>{};
    data.accountId = accountId;
    data.isActive = isActive;
    return this.apiService.post(EndPointsConfig.EndPoints.Purchase_PurchaseAccount_SetAccountStatus, data);
  }
}
