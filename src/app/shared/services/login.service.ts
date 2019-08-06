import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ApiService} from './api.service';
import {JwtService} from './jwt.service';
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {EndPointsConfig} from "../Config";

@Injectable()
export class LoginService {
  constructor(public apiService: ApiService, public jwtService: JwtService) {

  }

  public Login(workerNo: string, password: string): Observable<ApiResponseBaseModel<string>> {
    const data = {
      'WorkerNo': workerNo,
      'Password': password
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Login, data);
  }
  public getResourceTree(): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.get(EndPointsConfig.EndPoints.Role_GetResourceTreeQuery);
  }
}
