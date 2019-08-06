export class SkuListModel {
  id: number;
  imageUrl: string;
  skuCode: string;
  name:string;
  weight:number;
  length:number;
  width:number;
  height:number;

  costPrice:number;
  status:string;
  createdUserId:number;
  createdUserName:string;
  createdTime:Date;
  lastModifiedByUserId?: number;
  lastModifiedUserName: string;
  isUsing: boolean;
  inventories: SkuWarehouseInventoryModel[];

}

export class SkuWarehouseInventoryModel{
  quantity: number;
  warehouseName: string;
}
