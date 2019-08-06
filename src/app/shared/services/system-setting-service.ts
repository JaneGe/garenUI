import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";
import {ApiPageList} from "../models/page-list.model";
import {ChooseSkuListModel} from "../models/products/ChooseSku-list-model";
import {ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http"


@Injectable()
export class SystemSettingService {
  constructor(private apiService: ApiService) {

  }


  getExchangeRateLossList( ): Observable<ApiResponseBaseModel<any>> {

    return this.apiService.get(EndPointsConfig.EndPoints.GetExchangeRateLossList);
  }

  saveExchangeRateLoss(id:number,from:string,to:string,exchangeRateLos:number): Observable<ApiResponseBaseModel<any>> {
    const searchParams = new URLSearchParams()
    searchParams.set('id', id && id.toString());
    searchParams.set('from', from);
    searchParams.set('to',to);
    searchParams.set('exchangeRateLos',exchangeRateLos&& exchangeRateLos.toString());
    return this.apiService.post(EndPointsConfig.EndPoints.SaveExchangeRateLoss, null,searchParams);
  }

  deleteExchangeRateLoss(id: number[]): Observable<ApiResponseBaseModel<any>> {
    let postData: number[] = null;
    if (id != null && id.length > 0) {
      postData = id;
    }
    return this.apiService.post(EndPointsConfig.EndPoints.ExchangeRateLoss_Delete, postData);
  }



}
