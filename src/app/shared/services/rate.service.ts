import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { EndPointsConfig } from "../Config";
import { Http, Headers, RequestOptions, Jsonp } from '@angular/http';
import { ApiService } from "./api.service";
import { ApiResponseBaseModel } from 'app/shared/models/api.response.basemodel';
@Injectable()
export class RateService {

    constructor(public apiService: ApiService) {
    }
  
    getCurrencyRate(): Observable<ApiResponseBaseModel<any>> {
 
      return this.apiService.get(EndPointsConfig.EndPoints.GetCurrencyRateList);

    }
  
}
