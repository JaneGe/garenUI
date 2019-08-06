export class ResourceModel {
  name: string;
  id: number;
  isLeaf: boolean;
  parentId?: number;
  permissions: PermissionModel[];
  childrens: ResourceModel[];
}

export class PermissionModel {
  id: number;
  name: string;
  resourceId: number;
}
