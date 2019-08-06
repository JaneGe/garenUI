import {ApiService} from "../../../../shared/services/api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../../../../shared/models/api.response.basemodel";
import {EndPointsConfig} from "../../../../shared/Config";
import { URLSearchParams } from "@angular/http";
@Injectable()
export class AccountListService{
  constructor(public apiService: ApiService) {

  }

  QueryForChannel(channelType:any): Observable<ApiResponseBaseModel<any[]>> {
    let searchParams = new URLSearchParams();
    searchParams.set('channelType', channelType);
    return this.apiService.get(EndPointsConfig.EndPoints.Orderstatistics_QueryForChannel, searchParams);
  }

  accoutlist=[
    {id:1,group:[
      {id:1,text:'sdfged564'},
      {id:2,text:'sdfged564'},
      {id:3,text:'sdfged564'},
      {id:4,text:'sdfged564'},
      {id:5,text:'sdfged564'},
      {id:6,text:'sdfged564'},
      {id:7,text:'sdfged564'},
      {id:8,text:'sdfged564'},
    ]},
    {id:2,group:[
      {id:9,text:'dfhfgh45645'},
      {id:10,text:'ghjhhhh88888'},
      {id:11,text:'qqqqqq111111'},
    ]},
  ];
}
