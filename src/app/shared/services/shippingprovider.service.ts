import { Injectable} from '@angular/core';
import { ApiService} from "./api.service";
import { Observable} from "rxjs/Observable";
import { EndPointsConfig} from "../Config";
import { ApiResponseBaseModel } from "../models/api.response.basemodel";
import { ShippingProviderLiteModel } from "../models/sps/shipping-provider-lite";
import { ShippingProviderAuthMetadataModel} from "../models/sps/shipping-provider-auth-metadata";
import { ShippingProviderAuthDataModel} from "../models/sps/shipping-provider-auth-data";
import {URLSearchParams} from '@angular/http';
import {ShippingProviderDoAuthCommand} from "app/shared/models/sps/shipping-provider-do-auth-command";
import {NeedAuthShippingProviderModel} from "../models/sps/need-auth-shipping-provider-model";

@Injectable()
export class ShippingProviderService {


  constructor(public apiService: ApiService) {
  }

  getAllAuthroizedShippingProviders(): Observable<ApiResponseBaseModel<ShippingProviderLiteModel[]>> {

    return this.apiService.get(EndPointsConfig.EndPoints.ShippingProvider_Authroized_Lite_List);
  }
  getAllShippingProviders(): Observable<ApiResponseBaseModel<ShippingProviderLiteModel[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingProvider_Lite_List);
  }
  getAllNeedAuthShippingProviders(): Observable<ApiResponseBaseModel<NeedAuthShippingProviderModel[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingProvider_Lite_NeedAuth_List);
  }

  getShippingProviderAuthMetaData(spId: number): Observable<ApiResponseBaseModel<ShippingProviderAuthMetadataModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id', spId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.ShippingProvider_AuthMetaData, searchParams);
  }
  getShippingProviderAuthData(spId: number): Observable<ApiResponseBaseModel<ShippingProviderAuthDataModel>> {
    const searchParams = new URLSearchParams();
    searchParams.set('id', spId.toString());
    return this.apiService.get(EndPointsConfig.EndPoints.ShippingProvider_AuthData, searchParams);
  }
  doAuthroize(authData: ShippingProviderDoAuthCommand): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.ShippingProvider_DoAuthroize, authData);
  }
  doCreateAuthroizeRequest(authData: any): Observable<ApiResponseBaseModel<any>> {

    return this.apiService.post(EndPointsConfig.EndPoints.ShippingProvider_DoCreateAuthroizeRequest, authData);
  }
}
