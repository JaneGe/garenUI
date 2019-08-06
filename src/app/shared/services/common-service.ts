import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {CountryItemModel} from "../models/commons/country-item-model";
import {EndPointsConfig} from "../Config";
import {Injectable} from "@angular/core";
import {CityListModel, ProvinceListModel, RegionListModel} from "../models/commons/province-list-model";
import { URLSearchParams } from "@angular/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class CommonService {

  constructor(public apiService: ApiService) {

  }

  getAllCountries(): Observable<ApiResponseBaseModel<CountryItemModel[]>> {

    return this.apiService.get(EndPointsConfig.EndPoints.Common_Get_All_Countries)
  }

  getProvinces(): Observable<ApiResponseBaseModel<ProvinceListModel[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Common_Get_Provinces)
  }

  getCities(provinceId: string): Observable<ApiResponseBaseModel<CityListModel[]>> {

    const searchParams = new URLSearchParams();
    searchParams.set('provinceId', provinceId);

    return this.apiService.get(EndPointsConfig.EndPoints.Common_Get_Cities, searchParams)
  }

  getRegions(cityId: string): Observable<ApiResponseBaseModel<RegionListModel[]>> {
    const searchParams = new URLSearchParams();
    searchParams.set('cityId', cityId);

    return this.apiService.get(EndPointsConfig.EndPoints.Common_Get_Regions, searchParams)
  }

  getUserImageUploadUrl(): string {
    const uploadImageUrl = `${environment.image_server_url}/image/User`;
    return uploadImageUrl;
  }
  getSkuImageUploadUrl(): string {
    const uploadImageUrl = `${environment.image_server_url}/image/Sku`;
    return uploadImageUrl;
  }
  getBrandImageUploadUrl(): string {
    const uploadImageUrl = `${environment.image_server_url}/image/Brand`;
    return uploadImageUrl;
  }
}
