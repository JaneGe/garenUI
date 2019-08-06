import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ApiService} from './api.service';
import {JwtService} from './jwt.service';
import {CurrentUserInfoModel} from "../models/current-user-info.model";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiPageList} from "../models/page-list.model";
import {URLSearchParams} from "@angular/http"
import { CommonData } from 'app/shared/common-data';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<CurrentUserInfoModel>(new CurrentUserInfoModel());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService,
              private http: Http,
              private jwtService: JwtService) {
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
          data => this.setUserInfo(data.user),
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setUserInfo(user: CurrentUserInfoModel) {
    // Set current user data into observable
    CommonData.CurrentUserInfo = user;
    console.info("setUserInfo")
    console.info(user)
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  setPageMenu(menu:any){
    if ( menu) {
      CommonData.PAGES_MENU = menu.resourceTrees;
      CommonData.PAGES_ROLE = menu.resourceAuthorities;
      CommonData.IsAdmin = menu.isAdmin;
    }
  }

  SaveCommonData(){
    // window.localStorage.clear();
    if(window.localStorage['PageMenu']) {
      window.localStorage.removeItem('PageMenu');
    }
    if(window.localStorage['PageRole']) {
      window.localStorage.removeItem('PageRole');
    }
    if(window.localStorage['IsAdmin']) {
      window.localStorage.removeItem('IsAdmin');
    }
    window.localStorage['PageMenu'] = JSON.stringify(CommonData.PAGES_MENU);
    window.localStorage['PageRole'] = JSON.stringify(CommonData.PAGES_ROLE);
    window.localStorage['IsAdmin'] = CommonData.IsAdmin;
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new CurrentUserInfoModel());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<CurrentUserInfoModel> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/settings' + route, {user: credentials})
      .map(
        data => {
          this.setUserInfo(data.user);
          return data;
        }
      );
  }


  getCurrentUser(): CurrentUserInfoModel {
    return this.currentUserSubject.value;
  }
  getCurrentUserPermissionCodes(): string[] {
    return this.currentUserSubject.value.permissionCodes;
  }
  // Update the user on the server (email, pass, etc)
  update(user): Observable<CurrentUserInfoModel> {
    return this.apiService
      .put('/user', {user})
      .map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      });
  }

  fetchCurrentUsrInfo(): Observable<ApiResponseBaseModel<CurrentUserInfoModel>> {
    return this.apiService.get(EndPointsConfig.EndPoints.GetCurrentUserInfo);
  }

  getUsrInfoById(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.get(EndPointsConfig.EndPoints.GetUserInfo);
  }

  updateUserInfo(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.User_EditInfo, data);
  }

  editUserImage(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.User_EditUserImage, data);
  }

  changePassWrod(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.User_ChangePassWrod, data);
  }

  getBlacklistUserList(pageNumber: number, pageSize: number,countryCode:string,
                       reissueNumberStart:number,reissueNumberEnd: number, searchText: string,searchType:string)
  :Observable<ApiResponseBaseModel<ApiPageList<any>>> {

    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    const searchParams = new URLSearchParams();

    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('countryCode', countryCode);
    searchParams.set('reissueNumberStart',reissueNumberStart && reissueNumberStart.toString());
    searchParams.set('reissueNumberEnd',reissueNumberEnd && reissueNumberEnd.toString());
    searchParams.set('searchText', searchText);
    searchParams.set('searchType', searchType);

    return this.apiService.get(EndPointsConfig.EndPoints.BlacklistUser_GetBlacklistUserList, searchParams);
  }

  getBlacklistUserInfoById(blacklistUsersId: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id',blacklistUsersId && blacklistUsersId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.BlacklistUser_GetBlacklistUserInfoById, searchParams);
  }

  deteleBlacklistUserById(id: number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id',id && id.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.BlacklistUser_DeteleBlacklistUserById, null, searchParams)
  }

  createBlacklistUser( date:any): Observable<ApiResponseBaseModel<any>> {

    return this.apiService.post(EndPointsConfig.EndPoints.BlacklistUser_CreateBlacklistUser, date);
  }

  GetUserListQuery(): Observable<ApiResponseBaseModel<any[]>> {
    return this.apiService.post(EndPointsConfig.EndPoints.PurchasePlatform_Order_GetUserListQuery);
  }

}
