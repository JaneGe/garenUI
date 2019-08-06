export class VirtualSkuListModel {
  id: number;
  code: string;
  createdUserId:number;
  createdUserName:string;
  createdTime:Date;
  lastModifiedByUserId?: number;
  lastModifiedUserName?: string;
  lastModifiedTime:Date;
  items: VirtualSkuItemModel[];

}
export class VirtualSkuItemModel{
  id: number;
  imageUrl: string;
  skuId: number;
  skuCode: string;
  quantity: number;
}
