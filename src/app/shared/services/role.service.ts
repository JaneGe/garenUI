import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {EndPointsConfig} from "../Config";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {DepartmentModel, DepartmentOptionModel} from "../models/departments/department.model";
import {DepartmentListModel} from "../models/departments/department-list.model";
import {URLSearchParams} from '@angular/http';
import {ApiPageList} from "../models/page-list.model";
import {RoleListModel} from "../models/roles/role-list.model";
import {RoleDetailModel, RoleModel, RoleOptionModel} from "../models/roles/role.model";

@Injectable()
export class RoleService {


  constructor(public apiService: ApiService) {
  }

  getRoleList(pageNumber: number, pageSize: number): Observable<ApiResponseBaseModel<ApiPageList<RoleListModel>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    let searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());


    return this.apiService.get(EndPointsConfig.EndPoints.Role_GetRoleList, searchParams);
  }

  getAllRoleOptionList(): Observable<ApiResponseBaseModel<RoleOptionModel[]>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Role_GetAllRoleOptionsList);
  }

  addRole(roleInfo: RoleModel): Observable<ApiResponseBaseModel<any>> {
    const data = {
      name: roleInfo.name,
      description: roleInfo.description,
      operationIds: roleInfo.operationIds
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Role_AddRole, data);
  }

  updateRole(roleInfo: RoleModel): Observable<ApiResponseBaseModel<any>> {
    const data = {
      id: roleInfo.id,
      name: roleInfo.name,
      description: roleInfo.description,
      operationIds: roleInfo.operationIds
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Role_UpdateRole, data);
  }

  deleteRole(roleId: number): Observable<ApiResponseBaseModel<any>> {
    let searchParams = new URLSearchParams();
    searchParams.set('id', roleId.toString());

    return this.apiService.post(EndPointsConfig.EndPoints.Role_DeleteRole, null, searchParams);
  }

  getOneRole(roleId: number): Observable<ApiResponseBaseModel<RoleDetailModel>> {
    let searchParams = new URLSearchParams();
    searchParams.set('id', roleId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Role_GetOneRole, searchParams);
  }
  getResourceTreeQuery(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Role_GetResourceTreeQuery);
  }
}
