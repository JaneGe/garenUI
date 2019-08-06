import {UserStatus} from "./member-list.model";

export class MemberDetailModel {
  id: number;
  userName: string;
  workerNo: string;
  departmentId: number;
  passWord: string;
  roleId: number;
  roles: MemberRoleModel[];
  warehouses:any[];
  channels:any[];
  phoneNumber: string;
  email: string;
  channelType:number;
  status: UserStatus;
}

export class MemberEditModel {
  id: number;
  userName: string;
  workerNo: string;
  departmentId: number;
  passWord: string;
  roles: MemberRoleModel[];
  userInChannels:any[];
  userInWarehouses:any[];
  phoneNumber: string;
  email: string;
  channelType:number;
  status: UserStatus;
}

class MemberRoleModel{
  id: number;
  name: string;
}

