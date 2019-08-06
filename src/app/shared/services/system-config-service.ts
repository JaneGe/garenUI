import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {CountryItemModel} from "../models/commons/country-item-model";
import {EndPointsConfig} from "../Config";
import {Injectable} from "@angular/core";
import {CityListModel, ProvinceListModel, RegionListModel} from "../models/commons/province-list-model";
import { URLSearchParams } from "@angular/http";
import {PurchaseConfigModel} from "../models/commons/purchase-config-model";

@Injectable()
export class SystemConfigService {

  constructor(public apiService: ApiService) {

  }

  getPurchaseConfig(): Observable<ApiResponseBaseModel<PurchaseConfigModel>> {
    return this.apiService.get(EndPointsConfig.EndPoints.System_Config_Get_Purchase_Config)
  }

  savePurchaseConfig(data: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.System_Config_Save_Purchase_Config, data)
  }
}
