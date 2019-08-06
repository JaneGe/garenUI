export class RoleDetailModel {
  id: number;
  name: string;
  description: string;
  operations: RoleOperationLiteModel[]
}
export class RoleModel {
  id: number;
  name: string;
  description: string;
  operationIds: number[]
}

class RoleOperationLiteModel {
  id: number;
  resourceId: number;

}
export class RoleOptionModel {
  id: number;
  name: string;
}
