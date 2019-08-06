import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { EndPointsConfig } from "../Config";
import { ApiResponseBaseModel } from "../models/api.response.basemodel";
import { URLSearchParams } from '@angular/http';

@Injectable()
export class CountryNameService {

  constructor(public apiService: ApiService) {
  }

  postCommonCountry(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.get(EndPointsConfig.EndPoints.PostCommonCountry);
  }

}
