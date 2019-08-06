import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {ApiPageList} from "../models/page-list.model";
import {AmazonAccountListModel} from "../models/channels/amazon-account-list.model";
import {EndPointsConfig} from "../Config";
import {ApiService} from "./api.service";
import {URLSearchParams} from '@angular/http';
import {ShopAmazonCreateAccountModel} from "../models/channels/shop.amazon.createaccount";
import {AccountLiteListModel} from "../models/channels/account-lite-list-model";
import {ChannelCarrierCodeModel} from "../models/channels/channel-carrier-code-model";
import {AliExpressAccountListModel} from "../models/channels/AliExpressAccountListModel";
import {WishAccountListModel} from "../models/channels/WishAccountListModel";

@Injectable()
export class ShopAccountService {

  constructor(public apiService: ApiService) {
  }


  getAmazonAccountList(pageNumber: number, pageSize: number,searchType: string, searchText: string,countryCode:string): Observable<ApiResponseBaseModel<any>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('searchType', searchType);
    searchParams.set('searchText', searchText);
    searchParams.set('countryCode', countryCode);

    return this.apiService.get(EndPointsConfig.EndPoints.Shop_Amazon_GetAccountList, searchParams);
  }

  addAmazonAccount(accountModel: ShopAmazonCreateAccountModel): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Shop_Amazon_CreateAccount, accountModel);
  }

  enableAccount(accountId: number): Observable<ApiResponseBaseModel<any>> {
    let searchParams = new URLSearchParams();
    searchParams.set('id', accountId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Shop_Account_Enable, null, searchParams);
  }

  disableAccount(accountId: number): Observable<ApiResponseBaseModel<any>> {
    let searchParams = new URLSearchParams();
    searchParams.set('id', accountId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Shop_Account_Disable, null, searchParams);
  }

  getAllAccountLiteList(channelType: string = null): Observable<ApiResponseBaseModel<AccountLiteListModel[]>> {
    let searchParams = new URLSearchParams();
    if (channelType != null) {
      searchParams.set('channelType', channelType);
    }
    return this.apiService.get(EndPointsConfig.EndPoints.Shop_All_Accounts_List, searchParams);
  }

  getAllWarehouse(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }


  getAllCarrierCodes(channelType: string = null): Observable<ApiResponseBaseModel<ChannelCarrierCodeModel[]>> {
    const searchParams = new URLSearchParams();
    if (channelType != null) {
      searchParams.set('channelType', channelType);
    }

    return this.apiService.get(EndPointsConfig.EndPoints.Shop_All_Carrier_Codes, searchParams);
  }

  GetEmailAccountByUserId(userId:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
      searchParams.set('userId', userId);
    return this.apiService.get(EndPointsConfig.EndPoints.Shop_GetEmailAccountByUserId, searchParams);
  }
  SetCurrentAccount(account:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Shop_SetCurrentAccount, account);
  }


  getAliExpressAccountList(searchType:any,searchText: string,pageNumber: number, pageSize: number):
     Observable<ApiResponseBaseModel<ApiPageList<AliExpressAccountListModel>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('searchText', searchText);
    searchParams.set('searchType', searchType);
    return this.apiService.get(EndPointsConfig.EndPoints.Shop_AliExpress_GetAccountList, searchParams);
  }
  getLoginUrl(channelId: number, displayName: string):
       Observable<ApiResponseBaseModel<string>> {

    const searchParams = new URLSearchParams();
    if(channelId != null){
      searchParams.set('channelId', channelId.toString());
    }
    const data = <any>{};
    data.displayName = displayName;
    return this.apiService.post(EndPointsConfig.EndPoints.Shop_AliExpress_GetLoginUrl, data, searchParams);
  }

  getWishAccountList(searchType:any,searchText: string,pageNumber: number, pageSize: number):
  Observable<ApiResponseBaseModel<ApiPageList<WishAccountListModel>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('searchText', searchText);
    searchParams.set('searchType', searchType);
    return this.apiService.get(EndPointsConfig.EndPoints.Shop_Wish_GetAccountList, searchParams);
  }
  getWishLoginUrl(channelId: number, displayName: string):  Observable<ApiResponseBaseModel<string>> {

    const searchParams = new URLSearchParams();
    if(channelId != null){
      searchParams.set('channelId', channelId.toString());
    }
    const data = <any>{};
    data.displayName = displayName;
    return this.apiService.post(EndPointsConfig.EndPoints.Shop_Wish_GetLoginUrl, data, searchParams);
  }
  getSetUserWithAccount(accountId:any,withType:any,userId:any,accountName:any): Observable<ApiResponseBaseModel<any>> {
    const data = {
      accountId:accountId,
      withType:withType,
      userId:userId,
      accountName:accountName
    };

    return this.apiService.post(EndPointsConfig.EndPoints.User_SetUserWithAccount,data);
  }
  GetUserByAccount(accountId:any,withType:any): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('accountId',accountId);
    searchParams.set('withType',withType);
    return this.apiService.get(EndPointsConfig.EndPoints.User_GetUserByAccount,searchParams);
  }
}
