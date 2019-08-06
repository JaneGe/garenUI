export class MemberListModel {
  id: number;
  name: string;
  workerNo: string;
  status: UserStatus;
  statusDesc: string;
  roles: MemberListRoleModel[];
  createdTime: Date;
}

export enum UserStatus {
  Disabled = -1,
  Inactive = 0,
  Actived = 1,
}
export class MemberListRoleModel {
  id: number;
  name: string;
}
