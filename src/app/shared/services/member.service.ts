import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";
import {EndPointsConfig} from "../Config";
import {ApiResponseBaseModel} from "../models/api.response.basemodel";
import {URLSearchParams} from '@angular/http';
import {ApiPageList} from "../models/page-list.model";
import {MemberListModel, UserStatus} from "../models/members/member-list.model";
import {MemberDetailModel, MemberEditModel} from "../models/members/member.model";


@Injectable()
export class MemberService {


  constructor(public apiService: ApiService) {
  }
  getMemberList(pageNumber: number, pageSize: number,status?:string,text?:string,kind?:string,selectRole?:Array<number>): Observable<ApiResponseBaseModel<ApiPageList<MemberListModel>>> {
    let pageIndex = pageNumber - 1;
    if (pageIndex < 0) {
      pageIndex = 0;
    }
    let searchParams = new URLSearchParams();
    searchParams.set('pageIndex', pageIndex.toString());
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('userStatus', status.toString());
    if(text!==''&&kind!=''){
      searchParams.set('searchText', text.toString());
      searchParams.set('searchType', kind.toString());
    }
    if(selectRole!=[]){
      for(let value of selectRole){
        searchParams.append('roleIds',value.toString());
      }
    }
    return this.apiService.get(EndPointsConfig.EndPoints.Memeber_GetMemberList, searchParams);
  }
  addMember(memberInfo: MemberDetailModel): Observable<ApiResponseBaseModel<any>>  {
     const data = {
        userName: memberInfo.userName,
        passWord: memberInfo.passWord,
        workerNo: memberInfo.workerNo,
        email: memberInfo.email,
        departmentId: memberInfo.departmentId,
        roleId: memberInfo.roleId,
        warehouses:memberInfo.warehouses,
       channels:memberInfo.channels,
       channelType:memberInfo.channelType,
       phoneNumber: memberInfo.phoneNumber,
      };
     return this.apiService.post(EndPointsConfig.EndPoints.Memeber_AddMember, data);
  }
  updateMember(memberInfo: MemberDetailModel): Observable<ApiResponseBaseModel<any>> {
    const data = {
      id: memberInfo.id,
      userName: memberInfo.userName,
      passWord: memberInfo.passWord,
      workerNo: memberInfo.workerNo,
      email: memberInfo.email,
      departmentId: memberInfo.departmentId,
      warehouses:memberInfo.warehouses,
      channels:memberInfo.channels,
      channelType:memberInfo.channelType,
      roleId: memberInfo.roleId,
      phoneNumber: memberInfo.phoneNumber,
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Memeber_UpdateMember, data);
  }

  getOneMember(memberId: number): Observable<ApiResponseBaseModel<MemberEditModel>> {
    let searchParams = new URLSearchParams();
    searchParams.set('id', memberId.toString());

    return this.apiService.get(EndPointsConfig.EndPoints.Memeber_GetOneMember, searchParams);
  }
  setMemberStatus(memberId: number,newStatus: UserStatus): Observable<ApiResponseBaseModel<any>> {

    const data = {
      id: memberId,
      status: newStatus
    };

    return this.apiService.post(EndPointsConfig.EndPoints.Memeber_SetMemberStatus, data);
  }

  setMemberPassword(memberId: number, newPassword: string) {
    const data = {
      id: memberId,
      passWord: newPassword
    };

    return this.apiService.post(EndPointsConfig.EndPoints.Memeber_SetMemberPassWord, data);
  }
}
