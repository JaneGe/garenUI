import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { EndPointsConfig } from "../Config";
import { ApiResponseBaseModel } from "../models/api.response.basemodel";
import { AmountModel } from "../models/logistics/amount.model";
import { URLSearchParams } from '@angular/http';
import { country } from "./countryCode";
@Injectable()
export class AmountService {

  constructor(public apiService: ApiService) {

  }
  getCountry() {
    return country;
  }
  getCountryDeclarationAmount(): Observable<ApiResponseBaseModel<any>> {

    return this.apiService.get(EndPointsConfig.EndPoints.GetCountryDeclarationAmount);

  }

  addCountryDeclarationAmount(departmentInfo: AmountModel): Observable<ApiResponseBaseModel<any>> {
    const data = {
      countryCode: departmentInfo.countryCode,
      currencyCode: departmentInfo.currencyCode,
      declaredAmount: departmentInfo.declaredAmount
    };
    return this.apiService.post(EndPointsConfig.EndPoints.PostCountryDeclarationAmount, data);
  }

  /*   addCountryDeclarationAmount(departmentInfo: DepartmentModel): Observable<ApiResponseBaseModel<any>> {
      const data = {
        departmentName : departmentInfo.name,
        description: departmentInfo.description,
        parentId: departmentInfo.parentId
      };
      return this.apiService.post(EndPointsConfig.EndPoints.PostCountryDeclarationAmount, data);
    }
  
    updateDepartment(departmentInfo: DepartmentModel): Observable<ApiResponseBaseModel<any>> {
      const data = {
        id: departmentInfo.id,
        departmentName : departmentInfo.name,
        description: departmentInfo.description,
        parentId: departmentInfo.parentId
      };
      return this.apiService.post(EndPointsConfig.EndPoints.Department_UpdateDepartment, data);
    }
  
    deleteDepartment(departmentId: number): Observable<ApiResponseBaseModel<any>> {
      let searchParams = new URLSearchParams();
      searchParams.set('id', departmentId.toString());
  
      // var ops = new RequestOptions({ params: search});
      return this.apiService.post(EndPointsConfig.EndPoints.Department_DeleteDepartment, null, searchParams);
    }
  
    getOneDepartment(departmentId: number): Observable<ApiResponseBaseModel<DepartmentModel>> {
      let searchParams = new URLSearchParams();
      searchParams.set('id', departmentId.toString());
  
      return this.apiService.get(EndPointsConfig.EndPoints.Department_GetOneDepartment, searchParams);
    } */
}
