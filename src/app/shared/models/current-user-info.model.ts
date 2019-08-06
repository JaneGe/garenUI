export class CurrentUserInfoModel {
  email: string;
  userId: number;
  userName: string;
  permissionCodes: string[];
  workerNo: string;
  phone: number;
  roles: SessionRoleModel[];
}

class SessionRoleModel {
  id: number;
  name: string;
  isAdmin: boolean;
}
