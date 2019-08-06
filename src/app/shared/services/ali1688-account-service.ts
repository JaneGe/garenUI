import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";
import {ApiPageList} from "../models/page-list.model";
import {Ali1688AccountListModel} from "../models/channels/ali1688/ali1688-account-list-model";
import {Ali1688AccountDetailModel} from "../models/channels/ali1688/ali1688-account-detail-model";

@Injectable()
export class Ali1688AccountService {
  constructor(public apiService: ApiService) {

  }

  getAccountList(searchType:any,searchText:any,pageNumber: number, pageSize: number): Observable<ApiResponseBaseModel<ApiPageList<Ali1688AccountListModel>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('ali1688Type', searchType);
    searchParams.set('searchText', searchText);
    return this.apiService.get(EndPointsConfig.EndPoints.Ali1688Accounts_Page_List, searchParams);
  }

  getAccountDetail(accountId: number): Observable<ApiResponseBaseModel<Ali1688AccountDetailModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('accountId', accountId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Ali1688Accounts_Account_Detail, searchParams);
  }

  getAuthLoginUrl(accountId: number, appKey: string, secretKey: string): Observable<ApiResponseBaseModel<string>> {
    const searchParams = new URLSearchParams();

    const data = {
      AppKey: appKey,
      SecretKey: secretKey,
    };
    if (accountId > 0) {
      searchParams.set('accountId', accountId.toString());
      return this.apiService.post(EndPointsConfig.EndPoints.Ali1688Accounts_ReAuth_Get_Login_Url, data, searchParams);
    }
    else {
      return this.apiService.post(EndPointsConfig.EndPoints.Ali1688Accounts_Auth_Get_Login_Url, data);
    }
  }

  enableAccount(accountId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('accountId', accountId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Ali1688Accounts_Enable, null, searchParams);
  }

  disableAccount(accountId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('accountId', accountId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Ali1688Accounts_Disable, null, searchParams);
  }

  editAddress(accountId: number, data: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('accountId', accountId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Ali1688Accounts_Edit_Address, data, searchParams);
  }
  getAllAliAccounts(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Ali1688Accounts_List);
  }

  setAli1688LoginPassword(accountId: number,data: any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('accountId', accountId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Ali1688Accounts_setloginpassword, data, searchParams);
  }

}
