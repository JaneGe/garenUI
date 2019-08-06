import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {EndPointsConfig} from "../Config";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {ResourceModel} from "../models/roles/permission.list.model";

@Injectable()
export class PermissionService {
  constructor(public apiService: ApiService) {
  }

  getAllPermissions(): Observable<ApiResponseBaseModel<ResourceModel []>>{


    return this.apiService.get(EndPointsConfig.EndPoints.Permission_AllResourcesPermission);
  }
}
