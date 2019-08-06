import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {EndPointsConfig} from "../Config";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {DepartmentModel, DepartmentOptionModel} from "../models/departments/department.model";
import {DepartmentListModel} from "../models/departments/department-list.model";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class DepartmentService {

  constructor(public apiService: ApiService) {

  }

  getAllDepartmentList(): Observable<ApiResponseBaseModel<DepartmentListModel[]>> {

    return this.apiService.get(EndPointsConfig.EndPoints.Department_GetAllDepartmentList);
  }

  getAllDepartmentOptionList(): Observable<ApiResponseBaseModel<DepartmentOptionModel[]>> {

    return this.apiService.get(EndPointsConfig.EndPoints.Department_GetAllDepartmentOptionsList);
  }

  getAllWarehouse(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Warehouse_All_Option_List);
  }

  getAllRole(): Observable<ApiResponseBaseModel<DepartmentOptionModel[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Role_GetAllRoleOptionsList);
  }
  addDepartment(departmentInfo: DepartmentModel): Observable<ApiResponseBaseModel<any>> {
    const data = {
      departmentName : departmentInfo.name,
      description: departmentInfo.description,
      parentId: departmentInfo.parentId
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Department_AddDepartment, data);
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
  }
  GetChannelAccount(param: any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Shop_Amazon_GetChannelAccount, param);
  }
}
